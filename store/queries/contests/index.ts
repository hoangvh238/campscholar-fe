import { baseApi } from "../base";
import { endpointContest } from "@/helpers/enpoints";


export const contestAPI = baseApi.injectEndpoints({
    endpoints : (build) => ({
        getContestById : build.query ({
            query: (id : string) =>
                endpointContest.GET_CONTEST_BY_ID.replace("{id}", id),
        }),
    })
})

export const {
    useGetContestByIdQuery,
} = contestAPI