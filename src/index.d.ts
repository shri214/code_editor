// src/index.d.ts

declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const value: string;
    export { ReactComponent };
    export default value;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.webp' {
    const value: string;
    export default value;
  }
  
  declare module '*.ico' {
    const value: string;
    export default value;
  }
  