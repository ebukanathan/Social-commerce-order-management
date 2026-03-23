enum OrderSource {
  WHATSAPP
  INSTAGRAM
  FACEBOOK
  WEBSITE
  WALK_IN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model Business {
  id          String     @id @default(uuid())
  name        String
  email       String     @unique
  phone       String?
  address     String?
  logoUrl     String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  users       User[]
  customers   Customer[]
  products    Product[]
  orders      Order[]
}

model User {
  id          String     @id @default(uuid())
  firstName   String
  lastName    String
  email       String     @unique
  password    String
  role        Role       @default(STAFF)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  businessId  String
  business    Business   @relation(fields: [businessId], references: [id], onDelete: Cascade)

  createdOrders Order[]  @relation("OrderCreatedBy")
}

model Customer {
  id          String     @id @default(uuid())
  name        String
  phone       String
  email       String?
  address     String?
  notes       String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  businessId  String
  business    Business   @relation(fields: [businessId], references: [id], onDelete: Cascade)

  orders      Order[]

  @@unique([businessId, phone])
}

model Product {
  id          String      @id @default(uuid())
  name        String
  description String?
  price       Decimal     @db.Decimal(10, 2)
  stock       Int         @default(0)
  sku         String?
  isActive    Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  businessId  String
  business    Business    @relation(fields: [businessId], references: [id], onDelete: Cascade)

  orderItems  OrderItem[]

  @@unique([businessId, name])
  @@unique([businessId, sku])
}

model Order {
  id            String        @id @default(uuid())
  orderNumber   String
  source        OrderSource
  status        OrderStatus   @default(PENDING)
  subtotal      Decimal       @db.Decimal(10, 2)
  deliveryFee   Decimal       @default(0) @db.Decimal(10, 2)
  discount      Decimal       @default(0) @db.Decimal(10, 2)
  total         Decimal       @db.Decimal(10, 2)
  notes         String?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  businessId    String
  business      Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)

  customerId    String
  customer      Customer      @relation(fields: [customerId], references: [id], onDelete: Restrict)

  createdById   String
  createdBy     User          @relation("OrderCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)

  orderItems    OrderItem[]

  @@unique([businessId, orderNumber])
  @@index([businessId, status])
  @@index([businessId, source])
  @@index([customerId])
}

model OrderItem {
  id          String    @id @default(uuid())
  quantity    Int
  unitPrice   Decimal   @db.Decimal(10, 2)
  subtotal    Decimal   @db.Decimal(10, 2)
  createdAt   DateTime  @default(now())

  orderId     String
  order       Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)

  productId   String
  product     Product   @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@index([orderId])
  @@index([productId])
}