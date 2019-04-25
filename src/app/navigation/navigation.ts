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
                id   : 'project-dashboard-analytics',
                title: 'Analytics',
                type : 'item',
                icon : 'multiline_chart',
                // url  : '/projects/2/dashboards/analytics'
            },
            {
                id   : 'project-dashboard-project',
                title: 'Project',
                type : 'item',
                icon : 'bar_chart',
                // url  : '/projects/1/dashboards/project'
            }
        ]
    },
    {
        id       : 'environments',
        title    : 'Environments',
        type     : 'group',
        children : [
            {
                id       : 'environments-overview',
                title    : 'Overview',
                type     : 'item',
                icon     : 'assessment',
                // url      : '/projects/:project_id/environments/list',
            },
            {
                id       : 'environments-details',
                title    : 'Editor',
                type     : 'collapsable',
                icon     : 'center_focus_strong',
                badge    : {
                    title    : '3',
                    bg       : '#555',
                    fg       : '#FFFFFF'
                },
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
    {
        id       : 'workflows',
        title    : 'Workflows',
        type     : 'group',
        children : [
            {
                id       : 'workflow-global',
                title    : 'Global',
                type     : 'item',
                icon     : 'device_hub',
                // url      : '/projects/:project_id/workflows/list',
            },
            {
                id       : 'workflow-operations',
                title    : 'Operations',
                type     : 'item',
                icon     : 'build',
                // url      : '/projects/:project_id/workflows/2',
            },
        ]
    },
    {
        id       : 'others',
        title    : 'Others',
        type     : 'group',
        icon     : 'dashboard',
        children : [
            {
                id   : 'servers',
                title: 'Servers & Clusters',
                type : 'item',
                icon : 'storage',
                // url  : '/projects/:project_id/todo'
            },
            {
                id   : 'team',
                title: 'Team',
                type : 'item',
                icon : 'group',
                // url  : '/projects/:project_id/todo'
            },
            {
                id   : 'all-projects',
                title: 'Back to projects',
                type : 'item',
                // icon : 'navigate_before',
                icon : 'undo',
                // url  : '/projects/:project_id/todo'
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
