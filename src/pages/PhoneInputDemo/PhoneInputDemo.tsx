import { useState } from 'react';
import { Button, CountryCodePhoneInput, Icon, TextInput } from '../../components';

export function PhoneInputDemo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneCountryKey, setPhoneCountryKey] = useState('US:+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="p-10">
      <div className="max-w-[720px] mx-auto bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] p-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="phone" size={18} className="text-[var(--color-primary-strong)]" />
          <h1
            className="text-[32px] leading-[40px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
          >
            Phone Input Demo Form
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            placeholder="Enter first name"
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-6 max-w-[320px]">
          <CountryCodePhoneInput
            label="Phone"
            countryKey={phoneCountryKey}
            phoneNumber={phoneNumber}
            onCountryChange={setPhoneCountryKey}
            onPhoneNumberChange={setPhoneNumber}
          />
        </div>

        <div className="mb-8">
          <TextInput
            label="Address"
            value={address}
            onChange={setAddress}
            placeholder="Enter address"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default PhoneInputDemo;
