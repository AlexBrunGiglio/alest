import { RolesList } from './shared-constant';

export class SharedService {
    public static userHasRole(user: { roles?: any[], rolesString?: string[] }, role: string, rolesFieldName = '') {
        return this.userHasOneOfRoles(user, [role], rolesFieldName);
    }

    public static userHasOneOfRoles(user: { roles?: any[], rolesString?: string[] }, roles: string[], rolesFieldName = '') {
        if (!user)
            return false;
        if (!rolesFieldName)
            rolesFieldName = user.roles && !!user.roles.length ? 'roles' : 'rolesString';
        return user && (user as any)[rolesFieldName] && (user as any)[rolesFieldName].some((x: any) => roles.indexOf(x) !== -1);
    }

    public static userIsAdmin(user: { roles?: any[], rolesString?: string[] }) {
        return this.userHasRole(user, RolesList.Admin);
    }

    public static userHasOneOfRights(user: { roles?: any[], rolesString?: string[] }, fullRolesList: { role: string; rights?: { code: string; }[] }[], rights: string[], rolesFieldName = '') {
        if (!user)
            return false;
        if (!rolesFieldName)
            rolesFieldName = user.roles && !!user.roles.length ? 'roles' : 'rolesString';
        if (!(user as any)[rolesFieldName])
            return;
        const userRolesStr = (user as any)[rolesFieldName] as string[];
        if (!userRolesStr?.length)
            return;
        const rolesWithRightsFromUser = fullRolesList.filter(x => userRolesStr.indexOf(x.role) !== -1);
        if (!rolesWithRightsFromUser?.length)
            return false;
        return rolesWithRightsFromUser.some(x => x.rights?.length && x.rights.some(y => rights.indexOf(y.code) !== -1));
    }

    public static userHasRight(user: { roles?: any[], rolesString?: string[] }, fullRolesList: { role: string; rights?: { code: string; }[] }[], right: string, rolesFieldName = '') {
        return this.userHasOneOfRights(user, fullRolesList, [right], rolesFieldName);
    }
}