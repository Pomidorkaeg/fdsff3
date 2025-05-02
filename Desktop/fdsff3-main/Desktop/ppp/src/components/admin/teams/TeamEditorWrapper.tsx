
import React from 'react';
import { Team } from '@/types/team';
import TeamEditor from './TeamEditor';

interface TeamEditorWrapperProps {
  team: Team;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamEditorWrapper: React.FC<TeamEditorWrapperProps> = ({
  team,
  onCancel,
  onSave,
  onChange,
}) => {
  return (
    <div className="p-0">
      <TeamEditor 
        team={team} 
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default TeamEditorWrapper;
