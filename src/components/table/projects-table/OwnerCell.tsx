import { ownerStyles } from './ProjectsTable.styles';

type OwnerCellProps = {
  name: string;
  avatar?: string;
};

export function OwnerCell({ name, avatar }: OwnerCellProps) {
  return (
    <div style={ownerStyles.container}>
      <div style={ownerStyles.avatar}>
        {avatar ? (
          <img src={avatar} alt={name} style={ownerStyles.avatarImage} />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#E9F0FE',
            color: '#2363DA',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span style={ownerStyles.name}>{name}</span>
    </div>
  );
}
