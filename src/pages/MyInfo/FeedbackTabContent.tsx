import { useState } from 'react';
import { Icon, TextInput, Button } from '../../components';

interface FeedbackTabContentProps {
  employeeName: string;
}

export function FeedbackTabContent({ employeeName }: FeedbackTabContentProps) {
  const [searchValue, setSearchValue] = useState('');

  const summaryText = `${employeeName}'s colleagues have shared positive feedback, praising her for her perseverance and dedication to protecting employee morale during times of transition. She is appreciated for her dependability, good questions, and ability to get work done on time. However, some suggest she should speak up about her ideas. Overall, she is seen as a great counselor and team member, with a notable sense of generosity and kindness.`;

  return (
    <div className="flex flex-col">
      {/* Helper Text (Info Message) */}
      <div className="flex items-start gap-2">
        <Icon name="eye-slash" size={16} className="text-[#777270] mt-0.5" />
        <span className="text-[14px] leading-[20px] text-[#676260]">
          Just so you know, feedback is hidden from {employeeName}.
        </span>
      </div>

      {/* Request Feedback Section */}
      <div className="mt-4">
        {/* Section Header with Icon and Tooltip */}
        <div className="flex items-center gap-2">
          <Icon name="users" size={20} className="text-[#48413f]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#48413f]">
            Request feedback about {employeeName}
          </span>
          <Icon name="circle-question" size={16} className="text-[#868180]" />
        </div>

        {/* Instruction Text */}
        <p className="text-[14px] leading-[20px] text-[#676260] mt-2">
          Select some employees who work with {employeeName}
        </p>

        {/* Feedback Request Form */}
        <div className="flex items-center gap-2 mt-2">
          <TextInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search names"
            size="small"
            className="w-[395px]"
          />
          <Button variant="standard" size="small">
            Send Request
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border-neutral-x-weak)] my-4" />

      {/* Feedback Summary Section */}
      <div>
        {/* Section Header with Icon and Tooltip */}
        <div className="flex items-center gap-2">
          <Icon name="sparkles" size={20} className="text-[#48413f]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#48413f]">
            Summary of feedback about {employeeName}
          </span>
          <Icon name="circle-question" size={16} className="text-[#868180]" />
        </div>

        {/* Summary Text */}
        <p className="text-[16px] leading-[24px] text-[#38312f] mt-2 pl-7">
          {summaryText}
        </p>
      </div>
    </div>
  );
}

export default FeedbackTabContent;
