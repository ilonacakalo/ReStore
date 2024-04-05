import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Product name is required.'),
    brand: yup.string().required('Brand is required.'),
    type: yup.string().required('Type is required.'),
    price: yup.number().typeError('Price must be a number.').required('Price is required.').min(10, 'Price must be at least 0.10€.'),
    quantityInStock: yup.number().typeError('Quantity must be a number.').required('Quantity in stock is required.').min(0, 'Quantity must be at least 0.').max(100, "Quantity can't be over 100."),
    description: yup.string().required('Description is required.'),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: schema => schema.required('Please provide an image.'),
        otherwise: schema => schema.notRequired()
    })
});
