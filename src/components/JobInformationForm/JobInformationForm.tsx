import { useState } from 'react';
import { Icon } from '../../components';
import { JobLocationOption } from '../JobLocationOption';

export function JobInformationForm() {
  const [postingTitle, setPostingTitle] = useState('');
  const [compensation, setCompensation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [internalJobCode, setInternalJobCode] = useState('');

  const [locationInOffice, setLocationInOffice] = useState(false);
  const [locationHybrid, setLocationHybrid] = useState(false);
  const [locationRemote, setLocationRemote] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full">
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
            className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
          />
        </div>
      </div>

      {/* Job Status */}
      <div className="flex flex-col gap-1 w-[720px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center flex-1 h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <div className="flex-1 flex items-center">
              <span className="text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
                Draft
              </span>
            </div>
            <div className="flex items-center gap-2 h-full shrink-0">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
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
            className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <span className="flex-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
              -Select-
            </span>
            <div className="flex items-center gap-2 h-full shrink-0">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-[248px]">
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
            Department
          </label>
          <div
            className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
            style={{ boxShadow: 'var(--shadow-100)' }}
          >
            <span className="flex-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
              -Select-
            </span>
            <div className="flex items-center gap-2 h-full shrink-0">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Employment Type */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div
          className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <span className="flex-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
            -Select-
          </span>
          <div className="flex items-center gap-2 h-full shrink-0">
            <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
            <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
          </div>
        </div>
      </div>

      {/* Minimum Experience */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Minimum Experience
        </label>
        <div
          className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <span className="flex-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
            -Select-
          </span>
          <div className="flex items-center gap-2 h-full shrink-0">
            <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
            <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
          </div>
        </div>
      </div>

      {/* Compensation */}
      <div className="flex flex-col gap-1 w-[248px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Compensation
        </label>
        <div
          className="flex items-center h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)]"
          style={{ boxShadow: 'var(--shadow-100)' }}
        >
          <input
            type="text"
            value={compensation}
            onChange={(e) => setCompensation(e.target.value)}
            placeholder="e.g. $10-15 Hourly DOE"
            className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none"
          />
        </div>
      </div>

      {/* Job Location */}
      <div className="flex flex-col gap-[13px]">
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
        </label>
        <div className="flex gap-[26px]">
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
    </div>
  );
}

export default JobInformationForm;
