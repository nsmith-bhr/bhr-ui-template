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

  const shouldShowDivider = (index: number) => {
    // Show divider after "Assigned to Me" (index 0)
    if (index === 0) return true;
    // Show divider after "Onboarding" (index 2)
    if (index === 2) return true;
    // Show divider after "Completed" (index 3)
    if (index === 3) return true;
    return false;
  };

  return (
    <div
      className="shrink-0"
      style={{
        width: '264px',
      }}
    >
      {/* Vertical Sidebar */}
      <div className="flex flex-col" style={{ gap: '4px' }}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const isExpanded = expandedTabs.has(tab.id);
          const hasSubItems = tab.subItems && tab.subItems.length > 0;

          // Check if any sub-item is active
          const hasActiveSubItem = hasSubItems && tab.subItems?.some(subItem => activeTab === subItem.id);

          // Parent should show green bg when expanded AND (directly selected OR has active sub-item)
          const showParentGreen = isExpanded && (isActive || hasActiveSubItem);

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
                className="flex items-center transition-colors cursor-pointer border-none outline-none text-left"
                style={{
                  width: '264px',
                  padding: '8px 12px',
                  backgroundColor: showParentGreen || (isActive && !hasSubItems) ? '#2e7918' : 'transparent',
                  color: showParentGreen || (isActive && !hasSubItems) ? '#ffffff' : '#48413f',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: showParentGreen || (isActive && !hasSubItems) ? 700 : 400,
                  lineHeight: '22px',
                  borderRadius: '8px',
                  gap: '8px',
                }}
              >
                {/* Icon */}
                {tab.icon && (
                  <Icon
                    name={tab.icon as any}
                    size={16}
                    style={{
                      color: showParentGreen || (isActive && !hasSubItems) ? '#ffffff' : '#48413f',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* Label with inline caret for items without badge */}
                <span style={{ flex: 1 }} className="flex items-center gap-1">
                  {tab.label}
                  {/* Inline dropdown icon for items without badge */}
                  {(tab.hasDropdown || hasSubItems) && !showParentGreen && !tab.badge && (
                    <Icon
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={12}
                      style={{
                        color: isActive && !hasSubItems ? '#ffffff' : '#777270',
                        flexShrink: 0
                      }}
                    />
                  )}
                </span>

                {/* Badge container */}
                <div className="flex items-center" style={{ gap: '8px' }}>
                  {/* Badge for items like Onboarding */}
                  {tab.badge && (
                    <>
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
                      {/* Dropdown icon for items with badge */}
                      {(tab.hasDropdown || hasSubItems) && !showParentGreen && (
                        <Icon
                          name={isExpanded ? 'chevron-up' : 'chevron-down'}
                          size={16}
                          style={{
                            color: isActive && !hasSubItems ? '#ffffff' : '#48413f',
                            flexShrink: 0
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </button>

              {/* Sub-items */}
              {hasSubItems && isExpanded && (
                <div className="flex flex-col" style={{ gap: '4px', marginTop: '4px' }}>
                  {tab.subItems?.map((subItem) => {
                    const isSubActive = activeTab === subItem.id;
                    const hasIcon = !!subItem.icon;
                    // Sub-tabs with icons: 232px width (indent 16px from left: 264 - 16 = 248, but actual width is 232)
                    // Nested sub-items (no icon): 204px width (indent 28px from left: 264 - 28 = 236, but we need 204, so 264 - 60 = 204)
                    const buttonWidth = hasIcon ? '232px' : '204px';
                    const leftMargin = hasIcon ? '16px' : '60px';

                    return (
                      <button
                        key={subItem.id}
                        onClick={() => onTabChange(subItem.id)}
                        className="flex items-center transition-colors cursor-pointer border-none outline-none text-left"
                        style={{
                          width: buttonWidth,
                          marginLeft: leftMargin,
                          padding: '8px 12px',
                          backgroundColor: isSubActive ? '#f5f4f1' : 'transparent',
                          color: isSubActive ? '#2e7918' : '#48413f',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '14px',
                          fontWeight: isSubActive ? 700 : 400,
                          lineHeight: '22px',
                          borderRadius: '8px',
                          gap: '8px',
                        }}
                      >
                        {/* Icon for sub-items */}
                        {hasIcon && (
                          <Icon
                            name={subItem.icon as any}
                            size={16}
                            style={{
                              color: isSubActive ? '#2e7918' : '#48413f',
                              flexShrink: 0
                            }}
                          />
                        )}

                        {/* Label */}
                        <span style={{ flex: 1 }}>{subItem.label}</span>

                        {/* Count badge */}
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
                            flexShrink: 0,
                          }}
                        >
                          {subItem.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Divider after certain items */}
              {shouldShowDivider(index) && (
                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#e5e4e1',
                    marginTop: '4px',
                    marginBottom: '4px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InboxSidebar;
