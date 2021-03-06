# DB 設計

## users table

|  Column  |  Type  |          Options          |
| :------: | :----: | :-----------------------: |
|   name   | string | null: false, unique: true |
|  email   | string | null: false, unique: true |
| password | string |        null: false        |

### Association

- has_many :groups, through: :members
- has_many :messages
- has_many :members

## groups table

| Column |  Type  |   Options   |
| :----: | :----: | :---------: |
|  name  | string | null: false |

### Association

- has_many :users, through: :members
- has_many :messages
- has_many :members

## messages table

|  Column  |  Type   |            Options             |
| :------: | :-----: | :----------------------------: |
|   body   | string  |                                |
|  image   | string  |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group

## members table

|  Column  |  Type   |            Options             |
| :------: | :-----: | :----------------------------: |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user
