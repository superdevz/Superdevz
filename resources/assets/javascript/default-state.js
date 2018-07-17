function defaultState () {
    return {
        pageLoading: true,
        auth: false,
        apiToken: false,
        sort: {
            categories: 'desc',
            pages: 'desc',
        },
        alerts: [],
        alertCount: 0,
        profile: {
            name: '',
            email: '',
            avatarSm: '',
            avatarMd: '',
            joinDate: ''
        },
        loading: {
            categories: false,
            pages: false,
        },
        error: {
            categories: false,
            pages: false,
            page: false
        },
        pageFormVisibility: false,
        pageFormTextarea: '',
        formVisiblity: {
            categories: {
                add: false,
                edit: false
            },
            pages: {
                add: false,
                edit: false
            }
        },
        selectedCard: {
            categories: {
                id: undefined,
                data: {
                    name: '',
                    color: ''
                }
            },
            pages: {
                id: undefined,
                data: {
                    category_id: undefined,
                    title: '',
                    markdown: ''
                }
            },
        },
        categories: [],
        pages: [],
    }
}

export default defaultState;