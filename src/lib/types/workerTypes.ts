type Address = {
  formattedAddress: string;
  zoneId: string;
};

export type WorkerProfile = {
  address: Address;
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
};

type JobShift = {
  startDate: string;
  endDate: string;
};

type JobCompany = {
  name: string;
  address: {
    formattedAddress: string;
    zoneId: string;
  };
  reportTo: {
    name: string;
    phone?: string;
  };
};

type JobTitle = {
  name: string;
  imageUrl: string;
};

export type WorkerMatch = {
  jobId: string;
  jobTitle: JobTitle;
  company: JobCompany;
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: JobShift[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  errorCode: string;
};

export type SuccessResponse = {
  success: boolean;
};

export type AcceptMatchResponse = SuccessResponse | ErrorResponse;

export type RejectMatchResponse = SuccessResponse | ErrorResponse;
