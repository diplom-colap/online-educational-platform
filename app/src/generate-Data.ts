import UserRoles from "supertokens-node/recipe/userroles";

export class DataGenerator {
    async generateData() {
        this.generateRole();
        this.signupRoot();      
    }

    async generateRole() {
        await UserRoles.createNewRoleOrAddPermissions("admin", []);
        await UserRoles.createNewRoleOrAddPermissions("learner", []);
    }

    async signupRoot() {
        const base_url = "http://localhost:3333";
        const json = {
            formFields: [
                {
                    id: "email",
                    value: "root@gmail.com"
                },
                {
                    id: "password",
                    value: "123456789a"
                },
                {
                    id: "name",
                    value: "root_admin"
                }, 
                {
                    id: "phone",
                    value: "000000000000"
                },
                {
                    id: "role",
                    value: "admin"
                }
            ],
        };

        try {
            const response = await fetch( base_url + "/auth/signup", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(json),
            });
        
            const data = await response.json();
            const status = data.status; 
            if (status === "FIELD_ERROR") {
                console.log("ROOT IS CREATED");
            }
        }catch (err: any) {
            if (err.isSuperTokensGeneralError === true) {
                // this may be a custom error message sent from the API by you.
                console.log(err.message);
            } else {
                console.log("Oops! Something went wrong.");
            }
        }
    }
}