import { ElNotification } from 'element-plus';
import type { NotificationParams } from 'element-plus';

class NotificationService {
    success(message: string, title?: string) {
        ElNotification({
            title: title || 'Success',
            message,
            type: 'success',
            duration: 3000
        });
    }

    error(message: string, title?: string) {
        ElNotification({
            title: title || 'Error',
            message,
            type: 'error',
            duration: 5000
        });
    }

    warning(message: string, title?: string) {
        ElNotification({
            title: title || 'Warning',
            message,
            type: 'warning',
            duration: 4000
        });
    }

    info(message: string, title?: string) {
        ElNotification({
            title: title || 'Info',
            message,
            type: 'info',
            duration: 3000
        });
    }

    // Custom notification với đầy đủ options
    show(options: NotificationParams) {
        ElNotification(options);
    }
}

export const notify = new NotificationService();