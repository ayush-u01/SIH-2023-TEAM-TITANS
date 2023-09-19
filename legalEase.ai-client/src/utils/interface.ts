export interface CreateChat {
  pId: string;
  authId: string;
  prompt: string;
}

export interface FetchChat {
  documentId: string;
}

export interface PDFType {
  pId: string;
  text: string;
  link: string;
  authId: string;
  createdAt: string;
}

export interface GetChat {
  authId: string;
}

export interface PassChange {
  authId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UpdateChat {
  documentId: string;
  prompt: string;
}

export interface RegisterType {
  isEmail: boolean;
  email: string;
  phoneNo: string;
  password: string;
}

export interface LoginType {
  isEmail: boolean;
  email: string;
  phoneNo: string;
  password: string;
}
