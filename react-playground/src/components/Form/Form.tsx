import React from 'react';
import { FormData } from '../../models';
import { UserNameInput } from './FormComponents/UserNameInput';
import { BirthDateInput } from './FormComponents/BirthDateInput';
import { SelectCountry } from './FormComponents/SelectCountry';
import { Gender } from './FormComponents/Gender';
import { FormAgree } from './FormComponents/FormAgree';
import './style.css';

type Props = {
  onSubmit: (card: FormData) => void;
};

interface State extends FormData {
  agree: boolean;
  errors: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    agree?: string;
  };
}

const INITIAL_STATE: State = {
  firstName: '',
  lastName: '',
  birthDate: '',
  country: 'Belarus',
  gender: 'male',
  agree: false,
  image: '',
  errors: {
    firstName: '',
    lastName: '',
    birthDate: '',
    agree: '',
  },
};

export class Form extends React.Component<Props> {
  firstNameInput: React.RefObject<HTMLInputElement>;
  lastNameInput: React.RefObject<HTMLInputElement>;
  birthDateInput: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  gender: React.RefObject<HTMLInputElement>;
  formAgree: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.birthDateInput = React.createRef();
    this.selectCountry = React.createRef();
    this.gender = React.createRef();
    this.formAgree = React.createRef();
    this.image = React.createRef();
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (this.image.current?.files?.length) {
      const file = this.image.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const card: FormData = {
          firstName: this.firstNameInput.current?.value ?? '',
          lastName: this.lastNameInput.current?.value ?? '',
          birthDate: this.birthDateInput.current?.value ?? '',
          country: this.selectCountry.current?.value ?? '',
          gender: this.gender.current?.checked ? 'male' : 'female',
          image: reader.result as string,
        };
        this.props.onSubmit(card);
      };
    }

    console.log(this.formAgree.current?.value ?? '');
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <UserNameInput label="Name" name="firstName" refOne={this.firstNameInput} />

        <UserNameInput label="Surname" name="lastName" refOne={this.lastNameInput} />

        <BirthDateInput refOne={this.birthDateInput} />

        <SelectCountry refOne={this.selectCountry} />
        <Gender refOne={this.gender} />
        <input className="formControl " type="file" ref={this.image} />
        <FormAgree refOne={this.formAgree} />

        <input className="form-btn" type="submit" value="Save" />
      </form>
    );
  }
}
