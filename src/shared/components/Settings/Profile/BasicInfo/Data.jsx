/**
 * Child component of Settings/Profile/AboutMe renders "About Me" section of profile setting page.
 */
/* global document */
import _ from 'lodash';
import React from 'react';
import PT from 'prop-types';

import { PrimaryButton, SecondaryButton } from 'topcoder-react-ui-kit';

import { getAllCountryObjects, getCountryObjFromAlpha3 } from 'utils/countries';
import { getAllGenders} from 'utils/genders';
import { getAllTShirtSizes} from 'utils/tShirtSizes';

import { looseEqual } from 'utils/tc';
import Select from 'components/Select';
import DefaultPortrait from 'assets/images/ico-user-default.svg';

import Styles from './styles.scss';

const countries = getAllCountryObjects();
const genders= getAllGenders();
const tShirtSizes= getAllTShirtSizes();
// console.log("countries", countries);
// console.log("genders", genders);
// console.log("tShirtSizes", tShirtSizes);

export default class Data extends React.Component {
  constructor(props) {
    super(props);
console.log("Entered basic info constructors")
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onUploadPhoto = this.onUploadPhoto.bind(this);
    this.onUpdateBio = this.onUpdateBio.bind(this);
    this.onUpdateFirstName = this.onUpdateFirstName.bind(this);
    this.onDeletePhoto = this.onDeletePhoto.bind(this);
    this.onSaveProfileBasicInfo= this.onSaveProfileBasicInfo.bind(this);
    this.onUpdateCountry = this.onUpdateCountry.bind(this);
    this.onUpdateLastName = this.onUpdateLastName.bind(this);
    this.onUpdateBirthDate = this.onUpdateBirthDate.bind(this);
    this.onUpdateGender = this.onUpdateGender.bind(this);
    this.onUpdateEthnic = this.onUpdateEthnic.bind(this);
    this.onUpdateTSize = this.onUpdateTSize.bind(this);
    this.onUpdateAddress = this.onUpdateAddress.bind(this);
    this.onUpdateState = this.onUpdateState.bind(this);
    this.onUpdateCity = this.onUpdateCity.bind(this);
    this.onUpdateZip = this.onUpdateZip.bind(this);
    this.onUpdateCurrent = this.onUpdateCurrent.bind(this);
    this.onUpdateInterest = this.onUpdateInterest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileState.deletingPhoto && !nextProps.profileState.deletingPhoto) {
      document.querySelector('#change-image-input').value = null;
    }
  }

  onChangeImage(e) {
    e.preventDefault();
    if (this.props.profileState.uploadingPhoto) {
      return;
    }
    const fileInput = document.querySelector('#change-image-input');
    fileInput.click();
  }

  onUploadPhoto(e) {
    e.preventDefault();
    if (this.props.profileState.uploadingPhoto) {
      return;
    }
    const fileInput = document.querySelector('#change-image-input');
    const file = fileInput.files[0];
    this.props.uploadPhoto(this.props.handle, this.props.tokenV3, file);
  }

  onDeletePhoto(e) {
    e.preventDefault();
    if (this.props.profileState.deletingPhoto) {
      return;
    }
    const newProfile = _.clone(this.props.profile);
    delete newProfile.photoURL;
    delete newProfile.groups;
    newProfile.tracks = newProfile.tracks || [];
    this.props.deletePhoto(newProfile, this.props.tokenV3);
  }

  onUpdateCountry(country) {
    if (country && country.alpha3) {
      this.props.onUpdateCountry(country.alpha3);
    }
  }
  onUpdateBio(e){
    e.preventDefault();
    const bio = document.querySelector('#profile-bio').value;
    console.log("Bio", bio);
    this.props.onUpdateBio(bio);
  }
  onUpdateFirstName(e){
    e.preventDefault();
    const firstName = document.querySelector('#profile-firstName').value;
    this.props.onUpdateFirstName(firstName);
  }
  onUpdateLastName(e){
    e.preventDefault();
    const lastName = document.querySelector('#profile-lastName').value;
    this.props.onUpdateLastName(lastName);
  }
  onUpdateBirthDate(e){
    e.preventDefault();
    const birthDate = document.querySelector('#profile-birthDate').value;
    this.props.onUpdateBirthDate(birthDate);
  }
  onUpdateGender(gender){
    // e.preventDefault();
    // const gender = document.querySelector('#profile-gender').value;
    this.props.onUpdateGender(gender.name);
  }
  onUpdateEthnic(e){
    e.preventDefault();
    const ethnic = document.querySelector('#profile-ethnic').value;
    this.props.onUpdateEthnic(ethnic);
  }
  onUpdateTSize(tSize){
    // e.preventDefault();
    // const tSize = document.querySelector('#profile-tSize').value;
    this.props.onUpdateTSize(tSize.name);
  }
  onUpdateAddress(e) {
    e.preventDefault();
    const address = document.querySelector('#profile-address').value;
    this.props.onUpdateAddress(address);
  }
  onUpdateState(e) {
    e.preventDefault();
    const state = document.querySelector('#profile-state').value;
    this.props.onUpdateState(state);
  }
  onUpdateCity(e) {
    e.preventDefault();
    const city = document.querySelector('#profile-city').value;
    this.props.onUpdateCity(city);
  }
  onUpdateZip(e) {
    e.preventDefault();
    const zip = document.querySelector('#profile-zip').value;
    this.props.onUpdateZip(e);
  }
  onUpdateCurrent(e) {
    e.preventDefault();
    const current = document.querySelector('#profile-current').value;
    this.props.onUpdateCurrent(e);
  }
  onUpdateInterest(e) {
    e.preventDefault();
    const interest = document.querySelector('#profile-interest').value;
    this.props.onUpdateInterest(e);
  }
  onSaveProfileBasicInfo(e) {
    e.preventDefault();
    this.props.onSaveProfileBasicInfo(e);
  }
  render() {
    const {
      profile,
      profileState,
      bio,
      countryCode,
      handle,
      firstName,
      lastName,
      birthDate,
      gender,
      ethnic,
      tSize,
      address,
      state,
      city,
      zip,
      current,
      interest
    } = this.props;
    const {
      uploadingPhoto,
      deletingPhoto,
      updatingProfile
    } = profileState;
    const needSave= !looseEqual(this.props.firstName, this.props.basicInfo.traits.data[0].firstName)
                  ||looseEqual(this.props.lastName, this.props.basicInfo.traits.data[0].lastName)
                  ||looseEqual(this.props.bio, this.props.basicInfo.traits.data[0].shortBio)
                  ||looseEqual(this.props.gender, this.props.basicInfo.traits.data[0].gender)
                  ||looseEqual(this.props.ethnic, this.props.basicInfo.traits.data[0].ethnicBackground)
                  ||looseEqual(this.props.countryCode, this.props.profile.competitionCountryCode)
                  ||looseEqual(this.props.tSize, this.props.basicInfo.traits.data[0].tshirtSize)
                  ||looseEqual(this.props.interest, this.props.basicInfo.traits.data[0].primaryInterestInTopcoder)
    const userCountry = getCountryObjFromAlpha3(countryCode);
    return (
      <div>
          <div style= {{padding: "0", width: "17.5%", marginRight: '5.4%', float: 'left'}}>
            <div styleName="image">
              <div styleName="edit-image">
                {
                  profile.photoURL &&
                  <img alt="User" src={profile.photoURL} styleName="profile-circle" />
                }
                {
                  !profile.photoURL &&
                  <DefaultPortrait styleName="profile-circle" />
                }
                <div styleName="buttons">
                  <PrimaryButton onClick={this.onChangeImage} disabled={uploadingPhoto || deletingPhoto} theme={{ button: Styles['file-upload'] }}>
                    Browse...
                  </PrimaryButton>
                  <input type="file" name="image" onChange={this.onUploadPhoto} id="change-image-input" className="hidden" />
                  {/* {
                    profile.photoURL &&
                    <div>
                      <SecondaryButton
                        onClick={this.onDeletePhoto}
                        disabled={uploadingPhoto || deletingPhoto}
                        theme={{ button: Styles['file-delete'] }}
                      >
                        {
                          deletingPhoto && <i className="fa fa-spinner fa-spin" />
                        }
                        {
                          !deletingPhoto && 'Delete'
                        }
                      </SecondaryButton>
                    </div>
                  } */}
                </div>
              </div>
            </div>
          </div>
          <div style= {{width: "77.1%", float: "left", padding: "0"}}>
            <p styleName= 'titleP'>{handle}</p>
            <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "0", paddingRight: "5px"}}>
              <p styleName= "headingsP">Firstname</p>
              <input type= "text"  name="firstName" id="profile-firstName" 
                    value={firstName} onChange= {this.onUpdateFirstName} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}} />
            </div>
            <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "5px", paddingRight: "0"}}>
              <p styleName= "headingsP">Lastname</p>
              <input type= "text" style= {{width: "100%"}} name="lastName" id="profile-lastName"
                    value={lastName} onChange= {this.onUpdateLastName} style= {{height: "36px", marginBottom: "10px", borderRadius: "4px", color: "#262628"}}/>
            </div>
            <p styleName= "headingsP"><span>Short Bio</span></p>
              <textarea
                name="bio"
                id="profile-bio"
                value={bio}
                maxLength="256"
                className="topcoder-input"
                onChange= {this.onUpdateBio}
                styleName= "textAreaP"
                placeholder="E.g., I'm a JS architect interested in creating new data interchange formats. I love sci-fi and riding my motorcycle."
              />
            <div styleName= "col-md-3 col-sm-3 col-xs-3 col-lg-3" style= {{paddingLeft: "0", paddingRight: "5px"}}>
              <p styleName= "headingsP">Birth Date</p>
              <input type= "date" style= {{width: "100%"}} name="birthDate" id="profile-birthDate" 
                    value={birthDate} onChange= {this.onUpdateBirthDate} style= {{height: "36px", marginBottom: "10px", borderRadius: "4px", color: "#262628"}} />
            </div>
            <div styleName= "col-md-3 col-sm-3 col-xs-3 col-lg-3" style= {{paddingLeft: "5px", paddingRight: "5px"}}>
              <p styleName= "headingsP">Gender</p>
              <Select
                name="gender"
                options={genders}
                id= "profile-gender"
                value={gender}
                onChange={this.onUpdateGender}
                placeholder="Gender"
                matchPos="start"
                matchProp="name"
                labelKey="name"
                valueKey="name"
                style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}}
                clearable={false}
              />
            </div>
            <div styleName= "col-md-4 col-sm-4 col-xs-4 col-lg-4" style= {{paddingLeft: "5px", paddingRight: "5px"}}>
              <p styleName= "headingsP">Ethnic</p>
              <input type= "text" style= {{width: "100%"}} name="ethnic" id="profile-ethnic" 
                    value={ethnic} onChange= {this.onUpdateEthnic} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}} />
            </div>
            <div styleName= "col-md-2 col-sm-2 col-xs-2 col-lg-2" style= {{paddingLeft: "5px", paddingRight: "0"}}>
              <p styleName= "headingsP">T-Shirt Size</p>
              <Select
                name="tSize"
                options={tShirtSizes}
                id= "profile-tSize"
                value={tSize}
                onChange={this.onUpdateTSize}
                placeholder="T-Shirt Size"
                matchPos="start"
                style= {{height: "36px", marginBottom: "10px", borderRadius: "4px", color: "#262628"}}
                matchProp="name"
                labelKey="name"
                valueKey="name"
                clearable={false}
              />
            </div>
            <p styleName= "headingsP">Address</p>
              <input type= "text" style= {{height: "36px", marginBottom: "10px", borderRadius: "4px", color: "#262628"}} name="address" id="profile-address" 
                      value={address} onChange= {this.onUpdateAddress} />
              <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "0", paddingRight: "5px"}} >
                <p styleName= "headingsP">Country</p>
                <Select
                  name="location"
                  style= {{height: "36px", borderRadius: "4px", marginBottom: "10px",  color: "#262628"}}
                  options={countries}
                  value={userCountry}
                  onChange={this.onUpdateCountry}
                  placeholder="Country"
                  matchPos="start"
                  matchProp="name"
                  labelKey="name"
                  valueKey="name"
                  clearable={false}
                />
              </div>
              <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "5px", paddingRight: "0"}}>
                <p styleName= "headingsP">State</p>
                <input type= "text" name="state" id="profile-state" 
                      value={state} onChange= {this.onUpdateState} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}}/>
              </div>
            <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "0", paddingRight: "5px"}}>
              <p styleName= "headingsP">City</p>
              <input type= "text" name="city" id="profile-city" 
                    value={city} onChange= {this.onUpdateCity} style= {{height: "36px", margin: "0", borderRadius: "4px", color: "#262628"}} />
            </div>
            <div styleName= "col-md-6 col-sm-6 col-xs-6 col-lg-6" style= {{paddingLeft: "5px", paddingRight: "0"}}>
              <p styleName= "headingsP">ZIP Code</p>
              <input type= "text" name="zip" id="profile-zip" 
                    value={zip} onChange= {this.onUpdateZip} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}} />
            </div>
            <p styleName= "headingsP">Current Location</p>
            <input type= "text" name="current" id="profile-current" 
                    value={current} onChange= {this.onUpdateCurrent} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}}/>
            <p styleName= "headingsP">Primary Interest of Topcoder</p>
            <input type= "text" name="interest" id="profile-interest" 
                    value={interest} onChange= {this.onUpdateInterest} style= {{height: "36px", marginBottom: "10px",  borderRadius: "4px", color: "#262628"}} />
            <div style= {{backgroundColor: "white", border: "none", textAlign: "center"}}>
            <PrimaryButton
              disabled= {!needSave}
              onClick={this.onSaveProfileBasicInfo}
              theme={{ button: Styles['save-button'] }}
            >
              Save Changes
            </PrimaryButton>
          </div>
          </div>
      </div>
    );
  }
}

Data.defaultProps = {
  bio: '',
  countryCode: null,
};

Data.propTypes = {
  handle: PT.string.isRequired,
  tokenV3: PT.string.isRequired,
  profile: PT.shape().isRequired,
  profileState: PT.shape().isRequired,
  bio: PT.string,
  countryCode: PT.string,
  onUpdateCountry: PT.func.isRequired,
  uploadPhoto: PT.func.isRequired,
  deletePhoto: PT.func.isRequired,
};
