import { z } from 'zod';

// Schema Client
export const clientSchema = z.object({
  _id: z.string(),
  name: z.string(),
  last_name: z.string(),
  telephone: z.string(),
  vehicle: z.string(),
  type_oil: z.string(),
  brand_oil: z.string(),
  filter: z.string(),
  mileage: z.string(),
  service_date: z.string(),
  contact: z.string()
});

export const contactSchema = z.array(
  z.object({
    _id: z.string(),
    client: clientSchema.pick({
      _id: true,
      name: true,
      last_name: true,
      telephone: true,
      vehicle: true,
      type_oil: true,
      brand_oil: true,
      filter: true,
      mileage: true,
      service_date: true,
      contact: true
    }),
    result: z.string(),
    createdAt: z.string()
  })
);

export const remindersSchema = z.array(
  clientSchema.pick({
    _id: true,
    name: true,
    last_name: true,
    telephone: true,
    vehicle: true,
    type_oil: true,
    brand_oil: true,
    filter: true,
    mileage: true,
    service_date: true,
    contact: true
  })
);

export const dashboardClientSchema = z.array(
  clientSchema.pick({
    _id: true,
    name: true,
    last_name: true,
    telephone: true,
    vehicle: true,
    type_oil: true,
    brand_oil: true,
    filter: true,
    mileage: true,
    service_date: true
  })
);

export const editClientSchema = clientSchema.pick({
  name: true,
  last_name: true,
  telephone: true,
  vehicle: true,
  type_oil: true,
  brand_oil: true,
  filter: true,
  mileage: true,
  service_date: true,
  contact: true
});

// Type Client inferido con Zod
export type Client = z.infer<typeof clientSchema>;
export type ArrayCutType = Pick<Client, '_id' | 'name' | 'last_name' | 'telephone' | 'vehicle' | 'type_oil' | 'brand_oil' | 'filter' | 'mileage' | 'service_date'>[];
export type ClientFormData = Pick<Client, 'name' | 'last_name' | 'telephone' | 'vehicle' | 'type_oil' | 'brand_oil' | 'filter' | 'mileage' | 'service_date'>;
export type ContactData = Pick<Client, 'contact'>;
export type ContactFormData = Pick<Client, 'name' | 'last_name' | 'telephone' | 'vehicle' | 'type_oil' | 'brand_oil' | 'filter' | 'mileage' | 'service_date' | 'contact'>;
export type ContactArray = z.infer<typeof contactSchema>;
export type SearchTelephoneForm = Pick<Client, 'telephone'>;