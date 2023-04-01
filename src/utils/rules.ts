import dayjs, {Dayjs} from "dayjs";

export const rules = {
    required: (message: string = "Обязательное поле") => ({
        required: true,
        message
    }),
    isDateAfter: (message: string = "Нельзя создать событие в прошлом") => () => ({
        validator(_: any, value: Dayjs) {
            if (value.isBefore(dayjs())) {
                return Promise.reject(new Error(message))
            }
            return Promise.resolve()
        }
    })
}