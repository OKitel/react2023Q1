import React from 'react';
import { FormData } from '../../models';
import { UserNameInput } from './FormComponents/UserNameInput';
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
    let isOk = true;

    if (!agree) {
      error.agree = 'Agree with privacy policy';
      isOk = false;
    }
    if (firstName.length === ZERO) {
      error.firstName = 'Name is required';
      isOk = false;
    }
    if (firstName.toLowerCase() === firstName) {
      error.firstName = 'Name should start with uppercase letter';
      isOk = false;
    }
    if (lastName.length === ZERO || lastName.toLowerCase() === lastName) {
      error.lastName = 'Surname is required';
      isOk = false;
    }
    if (lastName.toLowerCase() === lastName) {
      error.lastName = 'Surname should start with uppercase letter';
      isOk = false;
    }
    if (new Date(birthDate) > new Date()) {
      error.birthDate = 'Welcome back time traveler :)';
      isOk = false;
    } else if (birthDate.length === ZERO) {
      error.birthDate = 'Birth date is required';
      isOk = false;
    }
    if (!gender || gender.length === ZERO) {
      error.gender = 'Gender is required';
      isOk = false;
    }
    if (!country || country === '--select an option--') {
      error.country = 'Country is required';
      isOk = false;
    }
    if (!image) {
      error.image = 'Image is required';
      isOk = false;
    }
    this.setState({
      errors: error,
    });
    return isOk;
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
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
    const files = this.image.current && this.image.current.files;
    if (this.validateForm(card, files)) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const cardWithImage: FormData = {
          ...card,
          image: reader.result as string,
        };
        this.props.onSubmit(cardWithImage);
        this.form.current?.reset();
      };
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit} ref={this.form}>
        <UserNameInput label="Name" name="firstName" refOne={this.firstNameInput} />
        <span className="validationError">{errors.firstName}</span>
        <UserNameInput label="Surname" name="lastName" refOne={this.lastNameInput} />
        <span className="validationError">{errors.lastName}</span>
        <BirthDateInput refOne={this.birthDateInput} />
        <span className="validationError">{errors.birthDate}</span>
        <SelectCountry refOne={this.selectCountry} />
        <span className="validationError">{errors.country}</span>
        <Gender refOne={this.genderMale} refTwo={this.genderFemale} />
        <span className="validationError">{errors.gender}</span>
        <UploadImage refOne={this.image} />
        <span className="validationError">{errors.image}</span>
        <FormAgree refOne={this.formAgree} />
        <span className="validationError">{errors.agree}</span>
        <input className="form-btn" type="submit" value="Save" />
      </form>
    );
  }
}
