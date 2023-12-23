import "react";

declare module "react" {
  interface SVGProps<T> extends React.SVGProps<T> {
    title?: string;
  }
}
