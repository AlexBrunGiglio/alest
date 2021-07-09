import { Injectable } from "@angular/core";
import { AuthService, GenericResponse, LoginViewModel, ReferentialService, UserDto, UsersService } from "../providers/api-client.generated";
import { JwtPayload } from "../../../shared/jwt-payload"
import { AuthDataService } from "./auth-data.service";
import jwtDecode from "jwt-decode";
import { accessToken } from "../environments/constant"
import { LocalStorageService } from "./local-storage.service";
@Injectable()
export class AuthProvider {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private referentialService: ReferentialService,
    ) {

    }

    getDecodedAccessToken(token: string): JwtPayload {
        try {
            return jwtDecode(token);
        }
        catch (err) {
            return null;
        }
    }

    public getUserFromAccessToken(accessToken: string, setCurrentUser: boolean) {
        let user: UserDto;

        if (!accessToken)
            return null;
        try {
            const decoded: JwtPayload = this.getDecodedAccessToken(accessToken);
            console.log("🚀 ~ AuthProvider ~ getUserFromAccessToken ~ decoded", decoded);
            if (!decoded)
                return null;
            user = {
                disabled: false,
                mail: decoded.mail,
                username: decoded.username,
                id: decoded.id,
                rolesString: decoded.roles,
                firstname: decoded.firstname,
                lastname: decoded.lastname,
            };
            if (setCurrentUser) {
                AuthDataService.currentUser = user;
            }
        }
        catch (err) {
            user = null;
        }
        return user;
    }

    public handleLoginResponse(response: GenericResponse) {
        if (response.success) {
            AuthDataService.currentAuthToken = response.token;
            LocalStorageService.saveInLocalStorage(accessToken, AuthDataService.currentAuthToken);
        }
        this.getUserFromAccessToken(AuthDataService.currentAuthToken, true);
    }

    public async logout() {
        const userId = AuthDataService.currentUser?.id;
        AuthDataService.currentUser = null;
        AuthDataService.currentAuthToken = null;
        AuthDataService.currentRequester = null;
        LocalStorageService.removeFromLocalStorage(accessToken);
    }
}