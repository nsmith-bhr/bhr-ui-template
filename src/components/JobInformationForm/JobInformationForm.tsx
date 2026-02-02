import { useState, useEffect } from 'react';
import { Icon, Button } from '../../components';
import { JobLocationOption } from '../JobLocationOption';
import type { JobSuggestion } from '../../types/jobAI';
import { fetchJobSuggestions } from '../../services/jobAIService';

export function JobInformationForm() {
  // Form field values
  const [postingTitle, setPostingTitle] = useState('');
  const [jobStatus, setJobStatus] = useState('Draft');
  const [hiringLead, setHiringLead] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [minimumExperience, setMinimumExperience] = useState('');
  const [compensation, setCompensation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [internalJobCode, setInternalJobCode] = useState('');
  const [locationInOffice, setLocationInOffice] = useState(false);
  const [locationHybrid, setLocationHybrid] = useState(false);
  const [locationRemote, setLocationRemote] = useState(false);

  // AI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);
  const [showAssistantBubble, setShowAssistantBubble] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const [thinkingDots, setThinkingDots] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const jobStatuses = ['Draft', 'Open', 'On Hold', 'Closed'];
  const hiringLeads = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Martinez', 'Leslie Knotts'];
  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Customer Success', 'Operations', 'Finance', 'Human Resources'];
  const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship'];
  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)', 'Lead/Principal (10+ years)', 'Executive'];

  // Animate thinking dots
  useEffect(() => {
    if (!isGenerating) {
      setThinkingDots('');
      return;
    }

    const interval = setInterval(() => {
      setThinkingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      setShowAssistantBubble(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      const newSuggestion = await fetchJobSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setShowAssistantBubble(!!newSuggestion);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const fillItIn = async () => {
    if (!suggestion) return;

    setShowAssistantBubble(false);

    // Fill all fields - map the service data to the form structure
    setDepartment(suggestion.department);
    setEmploymentType(suggestion.employmentType);
    setMinimumExperience(suggestion.experienceLevel);

    // Map work schedule to location checkboxes
    setLocationInOffice(suggestion.workSchedule === 'In Office');
    setLocationHybrid(suggestion.workSchedule === 'Hybrid');
    setLocationRemote(suggestion.workSchedule === 'Remote');

    // Format compensation from salary range
    if (suggestion.salaryMin && suggestion.salaryMax) {
      const formattedComp = `$${parseInt(suggestion.salaryMin, 10).toLocaleString()}-${parseInt(suggestion.salaryMax, 10).toLocaleString()}/yr`;
      setCompensation(formattedComp);
    }

    setFilledFields(new Set(['department', 'employmentType', 'minimumExperience', 'compensation', 'location']));

    // Show toast
    setShowToast(true);
  };

  const undoField = (fieldName: string, setter: (val: any) => void, defaultValue: any = '') => {
    setter(defaultValue);
    setFilledFields(prev => {
      const next = new Set(prev);
      next.delete(fieldName);
      return next;
    });
  };

  const undoLocation = () => {
    setLocationInOffice(false);
    setLocationHybrid(false);
    setLocationRemote(false);
    setFilledFields(prev => {
      const next = new Set(prev);
      next.delete('location');
      return next;
    });
  };

  const getFieldReasoning = (fieldName: string) => {
    if (!suggestion?.reasoning) return null;
    return suggestion.reasoning.find(r => r.field === fieldName);
  };

  const FieldHighlight = ({ isHighlighted }: { isHighlighted: boolean }) =>
    isHighlighted ? (
      <div className="absolute inset-0 rounded-[var(--radius-xx-small)] border-2 border-[var(--color-primary-strong)] bg-[var(--color-primary-weak)]/20 pointer-events-none animate-pulse" />
    ) : null;

  const FieldExplanation = ({ fieldName }: { fieldName: string }) => {
    const reasoning = getFieldReasoning(fieldName);
    if (!reasoning || focusedField !== fieldName || !filledFields.has(fieldName)) return null;

    return (
      <div className="absolute left-0 top-full mt-2 z-50 w-[280px] p-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-lg shadow-lg animate-fadeIn">
        <div className="flex items-start gap-2">
          <Icon name="sparkles" size={14} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
          <span className="text-[13px] text-[var(--text-neutral-strong)] leading-relaxed">{reasoning.reason}</span>
        </div>
      </div>
    );
  };

  const UndoLink = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary-strong)] hover:underline z-10"
    >
      <Icon name="rotate-left" size={10} />
      Undo
    </button>
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* AI Inline Message */}
      {isGenerating && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg border animate-fadeIn"
          style={{
            background: 'linear-gradient(122.835deg, rgb(233, 243, 252) 0%, rgb(245, 238, 248) 100%)',
            borderColor: 'rgba(56, 49, 47, 0.08)',
            boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)'
          }}
        >
          <Icon name="sparkles" size={16} className="text-[#0066CC] flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[#0066CC] leading-[20px]">
              Looking at similar roles{thinkingDots}
            </div>
          </div>
        </div>
      )}

      {showAssistantBubble && !isGenerating && suggestion && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg border animate-fadeIn"
          style={{
            background: 'linear-gradient(122.835deg, rgb(233, 243, 252) 0%, rgb(245, 238, 248) 100%)',
            borderColor: 'rgba(56, 49, 47, 0.08)',
            boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)'
          }}
        >
          <Icon name="sparkles" size={16} className="text-[#0066CC] flex-shrink-0" />
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[#0066CC] leading-[20px]">
              {suggestion.confidence === 'high' && suggestion.matchCount > 0 && (
                <>I can fill this out based on {suggestion.matchCount} similar {postingTitle.toLowerCase().replace(/\s+(i{1,3}|iv|v|vi{0,3}|senior|junior|lead|principal|staff)$/i, '')} {suggestion.matchCount === 1 ? 'role' : 'roles'} in your {suggestion.department} department.</>
              )}
              {suggestion.confidence === 'medium' && suggestion.matchCount > 0 && (
                <>I can fill this out based on {suggestion.matchCount} similar {suggestion.matchCount === 1 ? 'role' : 'roles'} at your company.</>
              )}
              {suggestion.confidence === 'low' && (
                <>I can suggest some defaults for this role, but I don't have similar postings to reference.</>
              )}
            </div>
            <div className="text-[13px] text-[var(--text-neutral-medium)] leading-[19px]">
              {suggestion.confidence === 'high' && 'High confidence'}
              {suggestion.confidence === 'medium' && 'Medium confidence'}
              {suggestion.confidence === 'low' && 'Low confidence'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fillItIn}
              className="h-8 px-3 text-[13px] font-semibold leading-[19px] text-[#00618b] bg-white rounded-full hover:opacity-90 transition-opacity relative"
              style={{
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #AFD6A3 0%, #A6D0F3 34%, #D5BAE3 67%, #F6C499 96%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)'
              }}
            >
              Fill it In
            </button>
            <Button onClick={() => setShowAssistantBubble(false)} variant="standard" size="small">
              No thanks
            </Button>
          </div>
        </div>
      )}

      {/* Posting Title */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Posting Title<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div
          className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <input
            type="text"
            value={postingTitle}
            onChange={(e) => setPostingTitle(e.target.value)}
            placeholder="Start typing job title..."
            className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
          />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 p-4 bg-[var(--surface-neutral-white)] rounded-lg border border-[var(--border-neutral-medium)] animate-slideIn" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <Icon name="check-circle" size={20} className="text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[var(--text-neutral-x-strong)]">
              Filled {filledFields.size} fields
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-[13px] text-[var(--color-primary-strong)] hover:underline"
            >
              Review changes
            </button>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)]"
          >
            <Icon name="xmark" size={12} />
          </button>
        </div>
      )}

      {/* Job Status */}
      <div className="flex flex-col gap-1 w-full max-w-[720px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div className="flex items-center gap-2">
          <div
            className="relative flex items-center flex-1 h-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <select
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              className="flex-1 h-full pl-3 pr-10 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
            >
              {jobStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none flex items-center gap-2 h-full">
              <div className="w-px h-6 bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
          </div>
          <p className="text-[13px] leading-[19px] text-[var(--text-neutral-weak)]">
            Select "Open" to post this job on{' '}
            <a href="https://nook.bamboohr.com/careers" className="text-[var(--text-neutral-weak)] underline">
              nook.bamboohr.com/careers
            </a>{' '}
            and other job boards.
          </p>
        </div>
      </div>

      {/* Hiring Lead & Department */}
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 w-[248px]">
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
            Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
          </label>
          <div
            className="relative flex items-center h-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <select
              value={hiringLead}
              onChange={(e) => setHiringLead(e.target.value)}
              className="flex-1 h-full pl-3 pr-10 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
            >
              <option value="">-Select-</option>
              {hiringLeads.map((lead) => (
                <option key={lead} value={lead}>{lead}</option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none flex items-center gap-2 h-6">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-[248px]">
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
            Department
          </label>
          <div className="relative">
            <div
              className="relative flex items-center h-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            >
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onFocus={() => setFocusedField('department')}
                onBlur={() => setFocusedField(null)}
                className="flex-1 h-full pl-3 pr-10 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
              >
                <option value="">-Select-</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none flex items-center gap-2 h-6">
                <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
                <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
              </div>
              <FieldHighlight isHighlighted={filledFields.has('department')} />
              {filledFields.has('department') && department && (
                <UndoLink onClick={() => undoField('department', setDepartment)} />
              )}
            </div>
            <FieldExplanation fieldName="department" />
          </div>
        </div>
      </div>

      {/* Employment Type */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div className="relative">
          <div
            className="relative flex items-center h-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              onFocus={() => setFocusedField('employmentType')}
              onBlur={() => setFocusedField(null)}
              className="flex-1 h-full pl-3 pr-10 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
            >
              <option value="">-Select-</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none flex items-center gap-2 h-6">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
            <FieldHighlight isHighlighted={filledFields.has('employmentType')} />
            {filledFields.has('employmentType') && employmentType && (
              <UndoLink onClick={() => undoField('employmentType', setEmploymentType)} />
            )}
          </div>
          <FieldExplanation fieldName="employmentType" />
        </div>
      </div>

      {/* Minimum Experience */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Minimum Experience
        </label>
        <div className="relative">
          <div
            className="relative flex items-center h-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <select
              value={minimumExperience}
              onChange={(e) => setMinimumExperience(e.target.value)}
              onFocus={() => setFocusedField('experienceLevel')}
              onBlur={() => setFocusedField(null)}
              className="flex-1 h-full pl-3 pr-10 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
            >
              <option value="">-Select-</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none flex items-center gap-2 h-6">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
            <FieldHighlight isHighlighted={filledFields.has('minimumExperience')} />
            {filledFields.has('minimumExperience') && minimumExperience && (
              <UndoLink onClick={() => undoField('minimumExperience', setMinimumExperience)} />
            )}
          </div>
          <FieldExplanation fieldName="experienceLevel" />
        </div>
      </div>

      {/* Compensation */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Compensation
        </label>
        <div className="relative">
          <div
            className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <input
              type="text"
              value={compensation}
              onChange={(e) => setCompensation(e.target.value)}
              onFocus={() => setFocusedField('salaryRange')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. $10-15 Hourly DOE"
              className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none"
            />
            <FieldHighlight isHighlighted={filledFields.has('compensation')} />
            {filledFields.has('compensation') && compensation && (
              <UndoLink onClick={() => undoField('compensation', setCompensation)} />
            )}
          </div>
          <FieldExplanation fieldName="salaryRange" />
        </div>
      </div>

      {/* Job Location */}
      <div className="flex flex-col gap-[13px]">
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
            Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
          </label>
          {filledFields.has('location') && (
            <button
              onClick={undoLocation}
              className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary-strong)] hover:underline"
            >
              <Icon name="rotate-left" size={10} />
              Undo
            </button>
          )}
        </div>
        <div
          className="relative"
          onFocus={() => setFocusedField('location')}
          onBlur={() => setFocusedField(null)}
        >
          <div className="flex flex-wrap gap-4">
            <JobLocationOption
              icon="building"
              label="In Office"
              checked={locationInOffice}
              onChange={setLocationInOffice}
            />
            <JobLocationOption
              icon="house-building"
              label="Hybrid"
              checked={locationHybrid}
              onChange={setLocationHybrid}
            />
            <JobLocationOption
              icon="house-laptop"
              label="Remote"
              checked={locationRemote}
              onChange={setLocationRemote}
            />
          </div>
          {filledFields.has('location') && (
            <div className="absolute inset-0 rounded-lg border-2 border-[var(--color-primary-strong)] bg-[var(--color-primary-weak)]/10 pointer-events-none animate-pulse" />
          )}
          <FieldExplanation fieldName="location" />
        </div>
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div
          className="flex items-start h-[183px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Add your job description here..."
            className="flex-1 h-full bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none"
          />
        </div>
      </div>

      {/* Internal Job Code */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Internal Job Code
        </label>
        <div
          className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <input
            type="text"
            value={internalJobCode}
            onChange={(e) => setInternalJobCode(e.target.value)}
            className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
          />
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && suggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8" onClick={() => setShowReviewModal(false)}>
          <div className="bg-[var(--surface-neutral-white)] rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-neutral-x-weak)]">
              <h3 className="text-[20px] font-semibold text-[var(--color-primary-strong)]">
                AI-Filled Fields
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-strong)]"
              >
                <Icon name="xmark" size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Department</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.department}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Employment Type</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.employmentType}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Experience Level</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.experienceLevel}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Compensation</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">
                    ${parseInt(suggestion.salaryMin, 10).toLocaleString()}-${parseInt(suggestion.salaryMax, 10).toLocaleString()}/yr
                  </div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Work Schedule</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.workSchedule}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Location</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobInformationForm;
