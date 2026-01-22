import { useState } from 'react';
import { Icon } from '../Icon';
import type { InboxTab } from '../../data/inboxData';

interface InboxSidebarProps {
  tabs: InboxTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function InboxSidebar({ tabs, activeTab, onTabChange }: InboxSidebarProps) {
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set(['inbox']));

  const toggleExpanded = (tabId: string) => {
    const newExpanded = new Set(expandedTabs);
    if (newExpanded.has(tabId)) {
      newExpanded.delete(tabId);
    } else {
      newExpanded.add(tabId);
    }
    setExpandedTabs(newExpanded);
  };

  return (
    <div
      className="shrink-0"
      style={{
        width: '264px',
      }}
    >
      {/* Vertical Sidebar */}
      <div className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isExpanded = expandedTabs.has(tab.id);
          const hasSubItems = tab.subItems && tab.subItems.length > 0;

          return (
            <div key={tab.id}>
              {/* Main Tab Button */}
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(tab.id);
                    // Also select the parent when clicking
                    onTabChange(tab.id);
                  } else {
                    onTabChange(tab.id);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-2 transition-colors cursor-pointer border-none outline-none text-left"
                style={{
                  backgroundColor: isActive && !hasSubItems ? '#2e7918' : 'transparent',
                  color: isActive && !hasSubItems ? '#ffffff' : 'var(--text-neutral-strong)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: isActive && !hasSubItems ? 600 : 400,
                  lineHeight: '22px',
                  borderRadius: '8px',
                }}
              >
                <span>{tab.label}</span>
                <div className="flex items-center gap-2">
                  {/* Badge for items like Onboarding */}
                  {tab.badge && (
                    <span
                      className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full"
                      style={{
                        backgroundColor: '#d13c30',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        lineHeight: '18px',
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {/* Dropdown icon for parent items */}
                  {(tab.hasDropdown || hasSubItems) && (
                    <Icon
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      style={{ color: 'var(--icon-neutral-medium)' }}
                    />
                  )}
                </div>
              </button>

              {/* Sub-items */}
              {hasSubItems && isExpanded && (
                <div className="flex flex-col mt-1">
                  {tab.subItems?.map((subItem) => {
                    const isSubActive = activeTab === subItem.id;

                    return (
                      <button
                        key={subItem.id}
                        onClick={() => onTabChange(subItem.id)}
                        className="w-full flex items-center justify-between px-4 py-2 pl-8 transition-colors cursor-pointer border-none outline-none text-left"
                        style={{
                          backgroundColor: isSubActive ? '#f5f4f1' : 'transparent',
                          color: isSubActive ? '#2e7918' : 'var(--text-neutral-strong)',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '15px',
                          fontWeight: isSubActive ? 600 : 400,
                          lineHeight: '22px',
                          borderRadius: '8px',
                        }}
                      >
                        <span>{subItem.label}</span>
                        <span
                          className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full"
                          style={{
                            backgroundColor: isSubActive
                              ? 'rgba(46, 121, 24, 0.1)'
                              : 'var(--surface-neutral-xx-weak)',
                            color: isSubActive ? '#2e7918' : 'var(--text-neutral-medium)',
                            fontSize: '13px',
                            fontWeight: 600,
                            lineHeight: '18px',
                          }}
                        >
                          {subItem.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InboxSidebar;
