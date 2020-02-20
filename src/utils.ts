export const bem = (widgetName: string) => {
  return (element?: string, subElement?: string): string => {
    let cssClass = `cvi-${widgetName}`;
    if (element) {
      cssClass += `-${element}`;
    }
    if (subElement) {
      cssClass += `--${subElement}`;
    }
    return cssClass;
  };
};

export const parseNumberInput = (input?: number | string): number => {
  return typeof input === 'string' ? parseInt(input, 10) : input;
};

export const noop = (...args: any[]): void => {};

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
