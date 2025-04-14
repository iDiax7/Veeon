import colors from 'colors';

export const logSuccess = (message: string | any) => console.log(colors.green(message));
export const logError = (message: string | any) => console.log(colors.red(message));
export const logWarning = (message: string | any) => console.log(colors.yellow(message));
export const logInfo = (message: string | any) => console.log(colors.blue(message));
