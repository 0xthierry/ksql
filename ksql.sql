-- Create a stream from topic users
create stream users (name varchar, email varchar, id varchar) with (kafka_topic='users', value_format='JSON');

-- Create a stream from topic orders
create stream orders (user_id varchar, order_id varchar, value double, item varchar) with (value_format='JSON', kafka_topic='orders');

-- Join stream-streams
create stream "orders_users" as
  select
    o.item "item",
    o.value "value",
    o.order_id "order_id",
    o.user_id "user_id",
    u.email "email",
    u.name "name"
  from orders o
  -- You need to specify the range between these streams
  join users u within 14 days on u.id = o.user_id
  emit changes;