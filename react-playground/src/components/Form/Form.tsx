import React from 'react';
import { FormData } from '../../models';
import { UserNameInput } from './FormComponents/UserNameInput';
import { ErrorMessage } from './FormComponents/ErrorMessage';
import { BirthDateInput } from './FormComponents/BirthDateInput';
import { SelectCountry } from './FormComponents/SelectCountry';
import { Gender } from './FormComponents/Gender';
import { FormAgree } from './FormComponents/FormAgree';
import { UploadImage } from './FormComponents/UploadImage';
import './style.css';

type Props = {
  onSubmit: (card: FormData) => void;
};

interface State {
  errors: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    agree?: string;
    country?: string;
    gender?: string;
    image?: string;
  };
  showSuccessMessage: boolean;
}

const INITIAL_STATE: State = {
  errors: {
    firstName: '',
    lastName: '',
    birthDate: '',
    agree: '',
    country: '',
    gender: '',
    image: '',
  },
  showSuccessMessage: false,
};

const ZERO = 0;

export class Form extends React.Component<Props, State> {
  firstNameInput: React.RefObject<HTMLInputElement>;
  lastNameInput: React.RefObject<HTMLInputElement>;
  birthDateInput: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  genderMale: React.RefObject<HTMLInputElement>;
  genderFemale: React.RefObject<HTMLInputElement>;
  formAgree: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
  form: React.RefObject<HTMLFormElement>;

  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.birthDateInput = React.createRef();
    this.selectCountry = React.createRef();
    this.genderMale = React.createRef();
    this.genderFemale = React.createRef();
    this.formAgree = React.createRef();
    this.image = React.createRef();
    this.form = React.createRef();
  }

  validateForm(card: Omit<FormData, 'image'>, files: FileList | null): files is FileList {
    const { firstName, lastName, birthDate, country, gender } = card;
    const agree = this.formAgree.current?.checked;
    const image = files?.length;
    this.setState({ errors: {} });
    const error: State['errors'] = {
      agree: undefined,
      firstName: undefined,
      lastName: undefined,
      birthDate: undefined,
      country: undefined,
      gender: undefined,
      image: undefined,
    };

    if (!agree) {
      error.agree = 'Agree with privacy policy';
    }
    if (firstName.length === ZERO) {
      error.firstName = 'Name is required';
    } else if (firstName[0].toLowerCase() === firstName[0]) {
      error.firstName = 'Name should start with an uppercase letter';
    }
    if (lastName.length === ZERO) {
      error.lastName = 'Surname is required';
    } else if (lastName[0].toLowerCase() === lastName[0]) {
      error.lastName = 'Surname should start with an uppercase letter';
    }
    if (new Date(birthDate) > new Date()) {
      error.birthDate = 'Welcome back time traveler :)';
    } else if (birthDate.length === ZERO) {
      error.birthDate = 'Birth date is required';
    }
    if (!gender || gender.length === ZERO) {
      error.gender = 'Gender is required';
    }
    if (!country || country === '--select an option--') {
      error.country = 'Country is required';
    }
    if (!image) {
      error.image = 'Image is required';
    }
    this.setState({
      errors: error,
    });
    const values = Object.values(error);
    return values.every((item) => !item);
  }

  getClassName(): string {
    return this.state.showSuccessMessage ? 'successMessageVisible' : 'successMessageHidden';
  }

  readFormData(): Omit<FormData, 'image'> {
    let gender: 'male' | 'female' | undefined = undefined;
    if (this.genderMale.current?.checked) {
      gender = 'male';
    } else if (this.genderFemale.current?.checked) {
      gender = 'female';
    }
    const card: Omit<FormData, 'image'> = {
      firstName: this.firstNameInput.current?.value ?? '',
      lastName: this.lastNameInput.current?.value ?? '',
      birthDate: this.birthDateInput.current?.value ?? '',
      country: this.selectCountry.current?.value ?? '',
      gender: gender,
    };
    return card;
  }

  onFileLoad(file: File, cb: (fileAsString: string) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      cb(reader.result as string);
    };
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const card = this.readFormData();
    const files = this.image.current && this.image.current.files;
    if (this.validateForm(card, files)) {
      const file = files[0];
      this.onFileLoad(file, (fileAsString: string) => {
        const cardWithImage: FormData = {
          ...card,
          image: fileAsString,
        };
        this.props.onSubmit(cardWithImage);
        this.setState({ showSuccessMessage: true });
        this.form.current?.reset();
      });
    } else {
      this.setState({ showSuccessMessage: false });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit} role="form" ref={this.form}>
        <UserNameInput label="Name" name="firstName" refOne={this.firstNameInput} />
        <ErrorMessage message={errors.firstName} />
        <UserNameInput label="Surname" name="lastName" refOne={this.lastNameInput} />
        <ErrorMessage message={errors.lastName} />
        <BirthDateInput refOne={this.birthDateInput} />
        <ErrorMessage message={errors.birthDate} />
        <SelectCountry refOne={this.selectCountry} />
        <ErrorMessage message={errors.country} />
        <Gender refOne={this.genderMale} refTwo={this.genderFemale} />
        <ErrorMessage message={errors.gender} />
        <UploadImage refOne={this.image} />
        <ErrorMessage message={errors.image} />
        <FormAgree refOne={this.formAgree} />
        <ErrorMessage message={errors.agree} />
        <input className="form-btn" type="submit" role="button" value="Save" />
        <span className={this.getClassName()}>Your data has been saved successfully!</span>
      </form>
    );
  }
}
