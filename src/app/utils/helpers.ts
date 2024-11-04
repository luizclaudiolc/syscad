import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

export const SNACK_DEFAULT = (
  position: MatSnackBarHorizontalPosition = 'right'
): MatSnackBarConfig => {
  return {
    duration: 3000,
    horizontalPosition: position,
  };
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
