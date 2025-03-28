import { FIELD_PARAMS } from "@/constant/params"

export interface UserFieldProps {
    userData: {
        id: number,
        [FIELD_PARAMS.ROLE_ID]: string
        [FIELD_PARAMS.FIRST_NAME]: string
        [FIELD_PARAMS.LAST_NAME]: string
        email: string
        contact: string
        [FIELD_PARAMS.USER_TYPE]: string
        status: boolean | null
        [FIELD_PARAMS.LICENSE_NUMBER]: string
        address : string
        [FIELD_PARAMS.ASSIGN_LICENSE]: boolean
        [FIELD_PARAMS.CREATED_AT]: string
        [FIELD_PARAMS.UNIVERSITY_NAME]: string
    }
}