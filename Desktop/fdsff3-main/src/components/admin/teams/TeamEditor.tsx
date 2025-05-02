
import React from 'react';
import { Team } from '@/types/team';
import TeamEditorHeader from './editor/TeamEditorHeader';
import TeamEditorForms from './editor/TeamEditorForms';

interface TeamEditorProps {
  team: Team;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamEditor: React.FC<TeamEditorProps> = ({ team, onCancel, onSave, onChange }) => {
  return (
    <div className="p-6">
      <TeamEditorHeader onCancel={onCancel} onSave={onSave} />
      <TeamEditorForms team={team} onChange={onChange} />
    </div>
  );
};

export default TeamEditor;
