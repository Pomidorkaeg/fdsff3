
import React from 'react';
import { Team } from '@/types/team';
import TeamBasicInfoForm from '../forms/TeamBasicInfoForm';
import TeamDetailsForm from '../forms/TeamDetailsForm';
import TeamSocialLinksForm from '../forms/TeamSocialLinksForm';

interface TeamEditorFormsProps {
  team: Team;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamEditorForms: React.FC<TeamEditorFormsProps> = ({ team, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TeamBasicInfoForm team={team} onChange={onChange} />
      <div className="space-y-6">
        <TeamDetailsForm team={team} onChange={onChange} />
        <TeamSocialLinksForm team={team} onChange={onChange} />
      </div>
    </div>
  );
};

export default TeamEditorForms;
