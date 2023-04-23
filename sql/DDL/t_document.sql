CREATE TABLE t_document(
   crawl_id       bigint PRIMARY KEY     not null,
   cdate          timestamp              not null,
   html           text                   not null,
   is_deleted     boolean                not null
);
commit;

create index idx_document_crawl_id       ON t_document(crawl_id);
create index idx_document_cdate          ON t_document(cdate);
create index idx_document_is_deleted     ON t_document(is_deleted);

comment on column t_document.crawl_id         is 'crawl id';
comment on column t_document.html             is 'html content';
comment on column t_document.cdate            is 'creation date';
comment on column t_document.is_deleted       is 'indicate if the record is soft deleted';
