export const LogExecution = () => {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            console.log(`Executing ${propertyKey} with args:`, args);
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
};
