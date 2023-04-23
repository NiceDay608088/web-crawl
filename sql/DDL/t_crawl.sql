CREATE TABLE t_crawl(
   id             bigint PRIMARY KEY     not null,
   pid            bigint PRIMARY KEY             ,
   url            text                   not null,
   cdate          timestamp                      ,
   creator        bigint                         ,
   is_deleted     boolean
);
commit;

create index idx_crawl_pid            ON t_crawl(pid);
create index idx_crawl_cdate          ON t_crawl(cdate);
create index idx_crawl_creator        ON t_crawl(creator);
create index idx_crawl_is_deleted     ON t_crawl(is_deleted);

comment on column t_crawl.id          is 'record id';
comment on column t_crawl.pid         is 'parent record id';
comment on column t_crawl.url         is 'url';
comment on column t_crawl.cdate       is 'creation date';
comment on column t_crawl.creator     is 'user id of create user';
comment on column t_crawl.is_deleted  is 'indicate if the record is soft deleted';

CREATE SEQUENCE if not exists t_crawl_id_seq
INCREMENT 1
MINVALUE 1
MAXVALUE 999999999
START 1
CACHE 1;

alter table t_crawl alter column "id" set default nextval('t_crawl_id_seq')