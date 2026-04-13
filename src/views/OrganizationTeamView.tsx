import { useState } from 'react';
import { colors, spacing } from '../design-system/tokens';
import { Button, UserPlus, SearchInput, SideDrawer, PaginationWithPageSize, MoreVertical } from '../components';
import { AddTeamMembersSidebarView } from '../sidebarViews';

interface TeamMember {
  id: string;
  name: string;
  emailId: string;
  role: 'Project Admin' | 'User' | 'Assessor' | 'Admin';
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar?: string;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    background: colors.bg.surface.default,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: `${spacing[6]} ${spacing[8]}`,
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  searchContainer: {
    width: '300px',
  },
  tableContainer: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  thead: {
    background: colors.bg.surface.gray,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  th: {
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: '12px',
    fontWeight: '600' as const,
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  tbody: {
    background: 'white',
  },
  tr: {
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  td: {
    padding: `${spacing[4]} ${spacing[4]}`,
    fontSize: '14px',
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '600' as const,
    color: 'white',
    flexShrink: 0,
  },
  nameText: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
  },
  badge: (color: string, bg: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500' as const,
    color: color,
    background: bg,
  }),
  dot: (color: string) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
  }),
  menuButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
  },
};


export function OrganizationTeamView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Dummy data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Anita R Reddy',
      emailId: 'anitarreddy@acme.com',
      role: 'Project Admin',
      status: 'Active',
      lastActive: 'Friday, 24 Dec 2025',
    },
    {
      id: '2',
      name: 'Shiv prakash',
      emailId: 'shivprakash@acme.com',
      role: 'User',
      status: 'Active',
      lastActive: 'Friday, 24 Dec 2025',
    },
    {
      id: '3',
      name: 'Ramdin verma',
      emailId: 'ramdinverma@acme.com',
      role: 'User',
      status: 'Active',
      lastActive: 'Friday, 24 Dec 2025',
    },
    {
      id: '4',
      name: 'Ram duti',
      emailId: 'ramduti@crossbow.com',
      role: 'Assessor',
      status: 'Active',
      lastActive: '22 Dec 2025',
    },
    {
      id: '5',
      name: 'Anil Reddy',
      emailId: 'anilreddy@crossbow.com',
      role: 'Assessor',
      status: 'Active',
      lastActive: '22 Dec 2025',
    },
    {
      id: '6',
      name: 'Anita R Reddy',
      emailId: 'anitarreddy@acme.com',
      role: 'User',
      status: 'Active',
      lastActive: '21 Dec 2025',
    },
    {
      id: '7',
      name: 'Anita R Reddy',
      emailId: 'anitarreddy@acme.com',
      role: 'User',
      status: 'Active',
      lastActive: '18 Dec 2025',
    },
  ];

  const getRoleColor = (role: string) => {
    if (role === 'Project Admin') return { color: '#6941C6', bg: '#F9F5FF' };
    if (role === 'Assessor') return { color: '#B54708', bg: '#FFFAEB' };
    return { color: '#175CD3', bg: '#EFF8FF' };
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return { color: '#027A48', bg: '#ECFDF3', dot: '#12B76A' };
    return { color: '#344054', bg: '#F2F4F7', dot: '#667085' };
  };

  const getAvatarColor = (index: number) => {
    const colors = ['#7F56D9', '#2E90FA', '#EC4A0A', '#F79009', '#15B79E', '#6172F3'];
    return colors[index % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleInviteMembers = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleInvite = () => {
    // TODO: Implement invite logic
    handleCloseDrawer();
  };

  // Filter team members based on search
  const filteredMembers = teamMembers.filter(member => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.emailId.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower) ||
      member.status.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={styles.container}>
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Team Members</h1>
          <p style={styles.subtitle}>Oversee all users, assign global roles, and manage access permissions.</p>
        </div>

        <div style={styles.toolbar}>
          <div style={styles.searchContainer}>
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <Button
            label="Invite Members"
            icon={<UserPlus />}
            iconPosition="left"
            variant="primary"
            onClick={handleInviteMembers}
          />
        </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email ID</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Last active</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {paginatedMembers.map((member, index) => {
              const roleColors = getRoleColor(member.role);
              const statusColors = getStatusColor(member.status);
              
              return (
                <tr key={member.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <div style={{ ...styles.avatar, background: getAvatarColor(index) }}>
                        {getInitials(member.name)}
                      </div>
                      <span style={styles.nameText}>{member.name}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{member.emailId}</td>
                  <td style={styles.td}>
                    <div style={styles.badge(roleColors.color, roleColors.bg)}>
                      <div style={styles.dot(roleColors.color)} />
                      {member.role}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.badge(statusColors.color, statusColors.bg)}>
                      <div style={styles.dot(statusColors.dot)} />
                      {member.status}
                    </div>
                  </td>
                  <td style={styles.td}>{member.lastActive}</td>
                  <td style={styles.td}>
                    <button
                      type="button"
                      style={styles.menuButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.bg.surface.gray;
                      }}
                      onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <MoreVertical />
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        <PaginationWithPageSize
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredMembers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
      </div>

      {/* Side Drawer for Invite Members */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Add team members"
        icon={<UserPlus />}
        primaryButtonLabel="Invite"
        secondaryButtonLabel="Cancel"
        onPrimaryClick={handleInvite}
        onSecondaryClick={handleCloseDrawer}
      >
        <AddTeamMembersSidebarView />
      </SideDrawer>
    </div>
  );
}
