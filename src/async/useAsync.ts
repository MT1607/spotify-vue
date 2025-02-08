import {ref} from "vue";
import {errorHandle} from "../utils/error/error-handle";

export function useAsync<T> (asyncFn: (...args: any[]) => Promise<T>) {
    const data = ref<T | null>(null);
    const error = ref<Error | null>(null);
    const loading = ref(false);

    const execute = async (...args: any[]) => {
        loading.value = true;
        error.value = null;
        console.log(args);
        try {
            data.value = await asyncFn(...args);
            return data.value
        } catch (e) {
            error.value = e as Error;
            errorHandle.handle(error);
        } finally {
            loading.value = false;
        }
    }

    return {data, error, loading, execute};
}