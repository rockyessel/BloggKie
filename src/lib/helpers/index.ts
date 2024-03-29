import { FormErrorProps } from '@/interface';

export const isObjectEmpty = (obj: any): boolean => {
  if (Array.isArray(obj)) {
    return obj.length === 0; // Check if the array is empty
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const prop in obj) {
      if (!isObjectEmpty(obj[prop])) {
        return false; // Object property has a value
      }
    }
    return true; // All object properties have no values
  }

  if (typeof obj === 'string' && obj.trim() !== '') {
    return false; // String is not empty
  }

  return true; // Other types (number, boolean, null, undefined) have no values
};

export const stringToSlugValue = (slug: string) => {
  let sanitizedString = slug.replace(/ /g, '-');
  // Remove non-alphanumeric characters
  sanitizedString = sanitizedString.replace(/[^a-zA-Z0-9-]/g, '');
  return sanitizedString;
};

export const FormValidation = (
  formType: string,
  formData: string,
  formErr: FormErrorProps,
  setFormErr: React.Dispatch<React.SetStateAction<FormErrorProps>>
): boolean => {
  let currentState: boolean = true;

  switch (formType) {
    case 'name':
      try {
        const nameValidation = (formValue: string): boolean => {
          currentState = false;
          if (formValue.trim().length === 0) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name is required',
            };
            setFormErr(formState);
          } else if (formValue.trim().length <= 2) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name characters should be more than 2',
            };
            setFormErr(formState);
          } else if (formData.trim().length > 18) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name characters cannot be more than 18',
            };
            setFormErr(formState);
          } else if (formValue && new RegExp('^[a-zA-Z]$').test(formValue)) {
            const formState = {
              ...formErr,
              state: true,
              msg: "Can't include numbers or special characters eg. '1,23.. or !,@,#,$'",
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return nameValidation(formData);
      } catch (error) {
        console.error(new Error('Something happen in form name'));
      }

    case 'email':
      try {
        const emailValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Email is supposed to be empty',
            };
            setFormErr(formState);
          } else if (!new RegExp(/\S+@\S+\.\S+/).test(formData)) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Make sure your email is in this format: example@comapny.domain',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return emailValidation(formData);
      } catch (error) {
        console.error(new Error('something went wrong in email'));
      }

    case 'country':
      try {
        const countryValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Select one option from the above',
            };
            setFormErr(formState);
          }
          if (formValue === 'None') {
            const formState = {
              ...formErr,
              state: true,
              msg: 'This field is required',
            };

            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return countryValidation(formData);
      } catch (error) {
        console.error(new Error('Sth went wrong in country'));
      }

    case 'ph_number':
      try {
        const ph_numberValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone number required',
            };
            setFormErr(formState);
          } else if (!new RegExp('^(?=.*?[1-9])[0-9()-]+$').test(formValue)) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Incorrect Phone Number format',
            };
            setFormErr(formState);
          } else if (formValue.replace(/[^a-zA-Z0-9 ]/g, '').length < 6) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone Number cannot be less 6',
            };
            setFormErr(formState);
          } else if (formData.replace(/[^a-zA-Z0-9 ]/g, '').length > 13) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone Number cannot be greater 13',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return ph_numberValidation(formData);
      } catch (error) {
        console.error(new Error('sth went wrong in ph number'));
      }

    case `${'message' || 'comment'}`:
      try {
        const messageValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Message is required',
            };
            setFormErr(formState);
          } else if (formValue.length < 25) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Characters should be more than 25',
            };
            setFormErr(formState);
          } else if (formValue.length > 2000) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Characters cannot be more than 2000 (290-500 words)',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return messageValidation(formData);
      } catch (error) {
        console.error(new Error('sth went wrong in message'));
      }

    case 'password':
      const passwordValidation = (formValue: string): boolean => {
        let currentState = false;

        if (!formValue) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be empty',
          };

          setFormErr(formState);
        } else if (formValue.length < 8) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be less then 8 characters',
          };
          setFormErr(formState);
        } else if (formValue.length > 20) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be more than 20 characters',
          };
          setFormErr(formState);
        } else if (
          !new RegExp('^(?=[^\\d_].*?\\d)\\w(\\w|[!@#$%]){7,20}').test(
            formValue
          )
        ) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password must be strong eg: dek@IL32S/._',
          };

          // dek@IL32S/._
          setFormErr(formState);
        } else {
          currentState = true;
          const formState = {
            ...formErr,
            state: false,
            msg: '',
          };
          setFormErr(formState);
        }

        return currentState;
      };
      return passwordValidation(formData);

    default:
      break;
  }

  return currentState;
};
