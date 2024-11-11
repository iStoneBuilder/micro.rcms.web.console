export type ResultArray = {
  success: boolean;
  data: Array<any>;
};

export type ResultData = {
  success: boolean;
  data: any;
};
export type ResultPage = {
  success: boolean;
  data?: {
    data: Array<any>;
    meta: {
      totalRows: number;
      pageSize: number;
      curPage: number;
    };
  };
};
