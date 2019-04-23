import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboards',
        title    : 'Dashboards',
        translate: 'NAV.DASHBOARDS',
        type     : 'collapsable',
        icon     : 'dashboard',
        children : [
            {
                id   : 'analytics',
                title: 'Analytics',
                type : 'item',
                icon : 'multiline_chart',
                url  : '/projects/2/dashboards/analytics'
            },
            {
                id   : 'project',
                title: 'Project',
                type : 'item',
                icon : 'bar_chart',
                url  : '/projects/1/dashboards/project'
            }
        ]
    },
    {
        id       : 'workflows',
        title    : 'Workflows',
        type     : 'group',
        children : [
            {
                id       : 'global',
                title    : 'Global',
                type     : 'item',
                icon     : 'device_hub',
                url      : '/sample',
            },
            {
                id       : 'operations',
                title    : 'Operations',
                type     : 'item',
                icon     : 'build',
                url      : '/sample',
            },
        ]
    },
    {
        id       : 'environments',
        title    : 'Environments',
        type     : 'group',
        children : [
            {
                id       : 'overview',
                title    : 'Overview',
                type     : 'item',
                icon     : 'assessment',
                url      : '/projects/:project_id/environments/list',
            },
            {
                id       : 'detail',
                title    : 'Detail',
                type     : 'collapsable',
                icon     : 'details',
                children : [
                    {
                        id       : 'prod',
                        title    : 'Prod',
                        type     : 'item',
                        url      : '/projects/1/environments/1',
                    },
                    {
                        id       : 'test',
                        title    : 'Test',
                        type     : 'item',
                        url      : '/projects/1/environments/2',
                    },
                    {
                        id       : 'dev',
                        title    : 'Dev',
                        type     : 'item',
                        url      : '/projects/1/environments/3',
                    },
                ]
            },
        ]
    },
    /*{
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'login',
                title    : 'Login',
                translate: 'NAV.LOGIN.TITLE',
                type     : 'item',
                icon     : 'exit_to_app',
                url      : '/auth/login-2',
            }
        ]
    }*/
];
