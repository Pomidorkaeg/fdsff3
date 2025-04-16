
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  foundedYear: number;
  stadium: string;
  achievements: string[];
  coach: string;
  address: string;
  socialLinks: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  backgroundImage: string;
}
