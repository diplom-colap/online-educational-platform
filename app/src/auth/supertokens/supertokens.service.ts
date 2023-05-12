import { Inject, Injectable } from '@nestjs/common';
import supertokens from "supertokens-node";
import Session from 'supertokens-node/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from "../config.interface";
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role, SocialProvider } from '@prisma/client';

@Injectable()
export class SupertokensService {
    constructor(
        @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
        private readonly usersService: UsersService) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
                // EmailPassword.init({
                //     signUpFeature: {
                //         formFields: 
                //         [
                //             {
                //                 id: "name"
                //             }, 
                //             {
                //                 id: "phone"
                //             }, 
                //             {
                //                 id: "role"
                //             }
                //         ]
                //     },
                //     override: {
                //         apis: (originalImplementation) => {
                //             return {
                //                 ...originalImplementation,
                //                 signUpPOST: async function (input) {
        
                //                     if (originalImplementation.signUpPOST === undefined) {
                //                         throw Error("Should never come here");
                //                     }
        
                //                     // First we call the original implementation of signUpPOST.
                //                     let response = await originalImplementation.signUpPOST(input);
        
                //                     // Post sign up response, we check if it was successful
                //                     if (response.status === "OK") {
                //                         let { id, email } = response.user;
        
                //                         // // These are the input form fields values that the user used while signing up
                //                         let formFields = input.formFields;
                //                         // TODO: post sign up logic
                //                         // save user to my own database
                //                         var newUser = new CreateUserDto();
                //                         newUser.idOnSP = id;
                //                         newUser.email = email;
                //                         newUser.password = formFields[1]['value'];
                //                         newUser.name = formFields[2]['value'];
                //                         newUser.phone = formFields[3]['value'];
                //                         newUser.socialProvider = null;
                //                         if ( formFields[4]['value'] == "teacher")
                //                         {
                //                             newUser.role = Role.TEACHER
                //                         }
                //                         usersService.create(newUser);
                //                     }
                //                     return response;
                //                 }
                //             }
                //         }
                //     }
                // }),
                ThirdPartyEmailPassword.init({
                    signUpFeature: {
                        formFields: 
                        [
                            {
                                id: "name"
                            }, 
                            {
                                id: "phone"
                            }, 
                            {
                                id: "role"
                            }
                        ]
                    },
                    override: {
                        apis: (originalImplementation) => {
                            return {
                                ...originalImplementation,
                                emailPasswordSignUpPOST: async function (input) {
        
                                    if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                                        throw Error("Should never come here");
                                    }
        
                                    // First we call the original implementation of signUpPOST.
                                    let response = await originalImplementation.emailPasswordSignUpPOST(input);
        
                                    // Post sign up response, we check if it was successful
                                    if (response.status === "OK") {
                                        let { id, email } = response.user;
        
                                        // // These are the input form fields values that the user used while signing up
                                        let formFields = input.formFields;
                                        // TODO: post sign up logic
                                        // save user to my own database
                                        var newUser = new CreateUserDto();
                                        newUser.idOnSP = id;
                                        newUser.email = email;
                                        newUser.password = formFields[1]['value'];
                                        newUser.name = formFields[2]['value'];
                                        newUser.phone = formFields[3]['value'];
                                        newUser.socialProvider = null;
                                        if ( formFields[4]['value'] == "teacher")
                                        {
                                            newUser.role = Role.TEACHER
                                        }
                                        usersService.create(newUser);
                                    }
                                    return response;
                                },
                                thirdPartySignInUpPOST: async function (input) {
                                    if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                                        throw Error("Should never come here");
                                    }
        
                                    let response = await originalImplementation.thirdPartySignInUpPOST (input);
        
                                    if (response.status === "OK") {
                                        let { id, email } = response.user;
                                        // let formFields = input.formFields;
                                        let thirdPartyAuthCodeResponse = response.authCodeResponse;

                                        if (response.createdNewUser) {
                                            // TODO: Post sign up logic
                                            // save user to my own database
                                            // var newUser = new CreateUserDto();
                                            // newUser.idOnSP = id;
                                            // newUser.email = email;
                                            // newUser.password = formFields[1]['value'];
                                            // newUser.name = formFields[2]['value'];
                                            // newUser.phone = formFields[3]['value'];
                                            // newUser.socialProvider = SocialProvider.GOOGLE;
                                            // if ( formFields[4]['value'] == "teacher")
                                            // {
                                            //     newUser.role = Role.TEACHER
                                            // }
                                            // usersService.create(newUser);
                                        } else {
                                            // TODO: some post sign in logic
                                        }                                  
                                    }
                                    console.log("id party: " + input.clientId)
                                    return response;
                                }
                            }
                        }
                    },
                    providers: [
                        // We have provided you with development keys which you can use for testing.
                        // IMPORTANT: Please replace them with your own OAuth keys for production use.
                        ThirdPartyEmailPassword.Google({
                            clientId: "1063082744160-rhle6polfa5nb79gtgoncse01sl1ab1e.apps.googleusercontent.com",
                            clientSecret: "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"
                        }),
                        ThirdPartyEmailPassword.Github({
                            clientId: "467101b197249757c71f",
                            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                        }),
                        ThirdPartyEmailPassword.Apple({
                          clientId: "4398792-io.supertokens.example.service",
                          clientSecret: {
                              keyId: "7M48Y4RYDL",
                              privateKey:
                                  "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                              teamId: "YWQCXGJRJL",
                          },
                        }),
                        // ThirdParty.Facebook({
                        //    clientSecret: "FACEBOOK_CLIENT_SECRET",
                        //    clientId: "FACEBOOK_CLIENT_ID"
                        // })
                    ]
                }),
              Session.init({
                getTokenTransferMethod: () => "cookie",
              }),
            ]
        });
    }
}