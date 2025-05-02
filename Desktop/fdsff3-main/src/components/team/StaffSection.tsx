
import React from 'react';
import { Coach } from '@/types/coach';
import StaffCard from '../staff/StaffCard';

interface StaffSectionProps {
  staff: Coach[];
  primaryColor: string;
}

const StaffSection: React.FC<StaffSectionProps> = ({ staff, primaryColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {staff.map((member) => (
        <StaffCard
          key={member.id}
          member={member}
          primaryColor={primaryColor}
        />
      ))}
    </div>
  );
};

export default StaffSection;
