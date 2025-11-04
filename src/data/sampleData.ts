export type Row = {
  id: string;
  Name: string;
  Email: string;
  Age: number;
  Role: string;
  Department?: string;
  Location?: string;
};

export const SAMPLE_DATA: Row[] = [
  { id: '1', Name: 'Asif', Email: 'asif@example.com', Age: 28, Role: 'Frontend', Department: 'Engineering', Location: 'Bengaluru' },
  { id: '2', Name: 'Rakesh', Email: 'rakesh@example.com', Age: 34, Role: 'Backend', Department: 'Engineering', Location: 'Hyderabad' },
  { id: '3', Name: 'Bhavana', Email: 'bhavana@example.com', Age: 22, Role: 'Intern', Department: 'Design', Location: 'Pune' },
  { id: '4', Name: 'David', Email: 'david@example.com', Age: 30, Role: 'PM', Department: 'Product', Location: 'Mumbai' },
  { id: '5', Name: 'Manoj', Email: 'manoj@example.com', Age: 26, Role: 'Frontend', Department: 'Engineering', Location: 'Chennai' },
  { id: '6', Name: 'Harshitha', Email: 'harshitha@example.com', Age: 40, Role: 'DevOps', Department: 'Infrastructure', Location: 'Delhi' },
  { id: '7', Name: 'Gita', Email: 'gita@example.com', Age: 29, Role: 'Data', Department: 'Analytics', Location: 'Bengaluru' },
  { id: '8', Name: 'Hemanth', Email: 'hemanth@example.com', Age: 24, Role: 'Intern', Department: 'Engineering', Location: 'Hyderabad' },
  { id: '9', Name: 'Isha Patel', Email: 'isha@example.com', Age: 31, Role: 'QA', Department: 'Quality', Location: 'Pune' },
  { id: '10', Name: 'pavan', Email: 'pavan@example.com', Age: 36, Role: 'Lead', Department: 'Engineering', Location: 'Bengaluru' },
  { id: '11', Name: 'Kiran', Email: 'kiran@example.com', Age: 27, Role: 'Frontend', Department: 'Engineering', Location: 'Chennai' },
  { id: '12', Name: 'Sandeep', Email: 'sandeep@example.com', Age: 25, Role: 'Backend', Department: 'Engineering', Location: 'Delhi' },
  { id: '13', Name: 'Anirudh', Email: 'anirudh@example.com', Age: 35, Role: 'HR', Department: 'Engineering', Location: 'Kolkata' },
];
