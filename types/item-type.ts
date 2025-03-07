export type ProductItem = {
  descriptions: string;
  images: string[];
  colors: string;
  content: string;
  templateCode: any;
  provider: {
    address: string;
    phone: string;
    email: string;
    minimumPrice: number;
    colors: string;
    sizes: string;
    strengths: string;
    name: string;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
    id: string;
  };
  minPrice: number;
  name: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
};
export type ProductCustom = {
  descriptions: string;
  images: string[];
  colors: ProductListItemColor[];
  content: string;
  templateCode: any;
  provider: {
    address: string;
    phone: string;
    email: string;
    minimumPrice: number;
    colors: string;
    sizes: string;
    strengths: string;
    name: string;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
    id: string;
  };
  minPrice: number;
  name: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
};
export type ProductListItemColor = {
  name: string;
  hex: string;
};

export type SubProduct = {
  authorId: string;
  canvasCode: string;
  color: string;
  content: string;
  createdBy: string;
  createdDate: string;
  id: string;
  images: string[];
  lensVRUrl: string;
  name: string;
  price: number;
  sizes: string;
  templateId: string;
  updatedBy: string;
  updatedDate: string;
};

export type TypeDateProduct = {
  result: {
    items: ProductItem[];
    total: number;
    skiped: number;
    pageSize: number;
    metaData: any;
  };
  success: boolean;
  message: string;
  errorCode: any;
  errorDetails: any;
};
