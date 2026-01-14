export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  suggestions?: string[];
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export const defaultConversation: ChatConversation = {
  id: '1',
  title: 'Employee Onboarding',
  messages: [
    {
      id: '1',
      type: 'user',
      text: 'How can we make this better for you?',
    },
    {
      id: '2',
      type: 'ai',
      text: `Here are a few improvements I recommend:

1. Personalize the onboarding journey
2. Streamline administrative tasks
3. Strengthen human connection
4. Provide clear milestones and progress tracking`,
      suggestions: [
        'Set up employee welcome dashboard',
        'Assign onboarding buddies',
        'Add progress indicators',
      ],
    },
  ],
};

export const suggestionChips = [
  'Set up employee welcome dashboard',
  'Assign onboarding buddies',
  'Add progress indicators',
];

export const recentConversations: ChatConversation[] = [
  {
    id: '1',
    title: 'Employee Onboarding',
    messages: [
      {
        id: '1',
        type: 'user',
        text: 'How can we make this better for you?',
      },
      {
        id: '2',
        type: 'ai',
        text: `Here are a few improvements I recommend:

1. Personalize the onboarding journey
2. Streamline administrative tasks
3. Strengthen human connection
4. Provide clear milestones and progress tracking`,
        suggestions: [
          'Set up employee welcome dashboard',
          'Assign onboarding buddies',
          'Add progress indicators',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'PTO Policy Updates',
    messages: [
      {
        id: '1',
        type: 'user',
        text: 'What are the latest PTO policy changes?',
      },
      {
        id: '2',
        type: 'ai',
        text: 'Here are the recent PTO policy updates for 2026:\n\n1. Unlimited PTO for employees with 3+ years tenure\n2. Minimum 2 weeks vacation required annually\n3. Rollover policy extended to 10 days',
      },
    ],
  },
  {
    id: '3',
    title: 'Benefits Enrollment',
    messages: [
      {
        id: '1',
        type: 'user',
        text: 'When does benefits enrollment start?',
      },
      {
        id: '2',
        type: 'ai',
        text: 'Benefits enrollment begins on January 15, 2026 and runs through January 31, 2026. You can review and update your health insurance, dental, vision, and 401(k) selections during this period.',
      },
    ],
  },
  {
    id: '4',
    title: 'Performance Reviews',
    messages: [
      {
        id: '1',
        type: 'user',
        text: 'Help me prepare for performance reviews',
      },
      {
        id: '2',
        type: 'ai',
        text: 'Here are key steps to prepare for performance reviews:\n\n1. Review goal completion from last quarter\n2. Gather peer feedback\n3. Document key achievements\n4. Identify areas for growth',
      },
    ],
  },
];
