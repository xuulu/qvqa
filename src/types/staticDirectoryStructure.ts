type MediaCategory = {
  desktop?: string[];
  mobile?: string[];
  [key: string]: string[] | undefined; // 允许扩展其他设备类型
};

type AssetsStructure = {
  images?: {
    [category: string]: MediaCategory;
  };
  videos?: {
    [category: string]: MediaCategory;
  };
};

export type StaticDirectoryStructure = {
  assets: AssetsStructure;
};
