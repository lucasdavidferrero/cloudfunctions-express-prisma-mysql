/* Inserciones Jerarquías */
INSERT INTO categoria_rubro(aik_re1_codigo, aik_re2_codigo)
VALUES('00001', '00001'), ('00001', '00002'), -- Climatización
	  ('00002', '00003'), ('00002', '00004'), ('00002', '00005'), -- TV, audio y video
      ('00003','00006'), ('00003','00007'), ('00003','00008'), ('00003','00009'), ('00003','00038'), -- Tecnología
      ('00004', '00010'), ('00004', '00011'), ('00004', '00012'), ('00004', '00013'), ('00004', '00014'), -- Eléctrodomesticos
      ('00005', '00015'), ('00005', '00016'), ('00005', '00017'), -- Hogar
      ('00006', '00018'), ('00006', '00019'), ('00006', '00020'), -- Salud y Belleza
      ('00007', '00021'), ('00007', '00022'), ('00007', '00023'), ('00007', '00024'), ('00007', '00025'), ('00007', '00026'), -- Muebles
      ('00008', '00027'), ('00008', '00028'), -- Aire Libre
      ('00009', '00029'), ('00009', '00030'), -- Colchones y Sommiers
      ('00010', '00031'), -- Oficina
      ('00011', '00032'), ('00011', '00033'), -- Rodados
      ('00012', '00034'), ('00012', '00035'), ('00012', '00036'), ('00012', '00037'), -- Niños
      ('09999', '09999'); -- Sin Categoría -> Sin Rubro.
      
INSERT INTO rubro_familia(aik_re2_codigo, aik_fa_codigo)
VALUES ('00001', '0002'), ('00001', '0003'), ('00001', '0004'), ('00001', '0228'), ('00001', '0059'), -- Refrigeración
('00002', '0088'), ('00002', '0039'), ('00002', '0160'), ('00002', '0126'), ('00002', '0108'), -- Calefacción
('00003', '0125'), ('00003', '0214'), -- Smart TV
('00004', '0012'), ('00004', '0099'), ('00004', '0146'), ('00004', '0179'), ('00004', '0180'), ('00004', '0109'), -- Audio
('00005', '0210'), ('00005', '0072'), -- Accesorios Tv
('00006', '0057'), ('00006', '0213'), -- Celulares
('00007', '0231'), ('00007', '0283'), ('00007', '0113'), ('00007', '0070'), ('00007', '0312'), -- Informática
('00008', '0185'), -- Smartwatch
('00009', '0175'), ('00009', '0050'), -- Accesorios Tecnología
('00038', '0047'), -- Camara digital
('00010', '0105'), ('00010', '0089'), ('00010', '0104'), ('00010', '0095'), ('00010', '0096'), ('00010', '0056'), ('00010', '0316'), -- Heladera y freezer
('00011', '0061'), ('00011', '0008'), ('00011', '0145'), ('00011', '0110'), ('00011', '0112'), ('00011', '0049'), ('00011', '0177'), ('00011', '0091'), -- Cocinas y Hornos
('00012', '0083'), ('00012', '0120'), ('00012', '0121'), ('00012', '0122'), ('00012', '0123'), ('00012', '0197'), -- Lavado
('00013', '0041'), ('00013', '0042'), ('00013', '0218'), ('00013', '0220'), ('00013', '0384'), -- Termotanque y calefon
('00014', '0017'),('00014', '0025'),('00014', '0036'),('00014', '0090'),('00014', '0097'),('00014', '0102'),('00014', '0127'),('00014', '0111'),('00014', '0148'),('00014', '0149'),('00014', '0157'),('00014', '0162'),('00014', '0164'),('00014', '0174'),('00014', '0194'),('00014', '0227'),('00014', '0368'),('00014', '0223'),('00014', '0195'),('00014', '0379'),('00014', '0354'),('00014', '0356'), -- Ayudante de cocina
('00015', '0075'),('00015', '0031'),('00015', '0106'),('00015', '0310'),('00015', '0341'),('00015', '0367'), -- Ayudantes de patio
('00016', '0351'),('00016', '0129'),('00016', '0369'),('00016', '0342'),('00016', '0343'),('00016', '0365'),('00016', '0366'),('00016', '0370'), -- Herramientas
('00017', '0171'),('00017', '0132'),('00017', '0128'),('00017', '0311'),('00017', '0011'), -- Limpieza y confección
('00018', '0001'),('00018', '0033'),('00018', '0073'),('00018', '0074'),('00018', '0382'),('00018', '0080'),('00018', '0172'),('00018', '0193'),('00018', '0196'),('00018', '0225'), -- Cuidado personal
('00019', '0156'), ('00019', '0303'), ('00019', '0294'), -- Salud
('00020', '0027'),('00020', '0048'),('00020', '0293'),('00020', '0345'), -- Fitness
('00021', '0066'),('00021', '0076'),('00021', '0152'),('00021', '0199'),('00021', '0201'),('00021', '0203'),('00021', '0204'),('00021', '0137'),('00021', '0015'), -- Comedor
('00022', '0065'),('00022', '0005'),('00022', '0016'),('00022', '0143'), -- Amoblamiento de cocina
('00023', '0211'),('00023', '0158'),('00023', '0155'),('00023', '0288'),('00023', '0308'),('00023', '0019'),('00023', '0081'),('00023', '0209'),('00023', '0314'), -- Auxiliar de cocina
('00024', '0098'),('00024', '0116'),('00024', '0141'),('00024', '0208'),('00024', '0178'),('00024', '0166'),('00024', '0290'),('00024', '0192'),('00024', '0207'),('00024', '0136'), -- Living
('00025', '0082'),('00025', '0078'),('00025', '0052'),('00025', '0037'),('00025', '0067'),('00025', '0068'),('00025', '0058'),('00025', '0079'),('00025', '0077'),('00025', '0045'),('00025', '0046'),('00025', '0053'),('00025', '0170'),('00025', '0282'),('00025', '0190'),('00025', '0133'),('00025', '0138'),('00025', '0267'),('00025', '0268'), -- Dormitorio
('00026', '0349'),('00026', '0226'), -- Baño
('00027', '0114'),('00027', '0029'),('00027', '0051'),('00027', '0071'),('00027', '0030'),('00027', '0064'),('00027', '0135'),('00027', '0205'), -- Camping
('00028', '0018'),('00028', '0020'),('00028', '0186'),('00028', '0187'),('00028', '0130'),('00028', '0215'),('00028', '0206'),('00028', '0142'),('00028', '0100'),('00028', '0307'),('00028', '0350'),('00028', '0024'), -- Patio
('00029', '0062'),('00029', '0063'),('00029', '0032'),('00029', '0007'),('00029', '0176'), -- Descanso
('00030', '0236'),('00030', '0234'),('00030', '0347'),('00030', '0280'), -- Blanquería
('00031', '0357'),('00031', '0200'),('00031', '0084'),('00031', '0387'),('00031', '0292'),('00031', '0026'), -- Muebles de oficina
('00032', '0028'), -- Bicicletas
('00033', '0388'), -- Mobilidad Electrica
('00034', '0044'),('00034', '0103'),('00034', '0222'),('00034', '0169'),('00034', '0381'), -- Juegos para patio
('00035', '0009'),('00035', '0163'),('00035', '0224'),('00035', '0264'), -- Juguetes
('00036', '0034'),('00036', '0055'),('00036', '0021'),('00036', '0281'),('00036', '0202'),('00036', '0060'), -- Primera infancia
('00037', '0117'); -- Monopatines y autos a bateria

SELECT * FROM aikon_referencia01;

/* INSERTS de las familias que van en el rubro "SIN RUBRO" */
INSERT INTO rubro_familia(aik_re2_codigo, aik_fa_codigo)
SELECT '09999', aik_fa_codigo FROM aikon_familia WHERE aik_fa_codigo NOT IN ('0002',
'0003',
'0004',
'0228',
'0059',
'0088',
'0039',
'0160',
'0126',
'0108',
'0125',
'0214',
'0012',
'0099',
'0146',
'0179',
'0180',
'0109',
'0210',
'0072',
'0057',
'0213',
'0231',
'0283',
'0113',
'0070',
'0312',
'0185',
'0175',
'0050',
'0047',
'0105',
'0089',
'0104',
'0095',
'0096',
'0056',
'0316',
'0061',
'0008',
'0145',
'0110',
'0112',
'0049',
'0177',
'0091',
'0083',
'0120',
'0121',
'0122',
'0123',
'0197',
'0041',
'0042',
'0218',
'0220',
'0384',
'0017',
'0025',
'0036',
'0090',
'0097',
'0102',
'0127',
'0111',
'0148',
'0149',
'0157',
'0162',
'0164',
'0174',
'0194',
'0227',
'0368',
'0223',
'0195',
'0379',
'0354',
'0356',
'0075',
'0031',
'0106',
'0310',
'0341',
'0370',
'0351',
'0129',
'0369',
'0370',
'0342',
'0343',
'0365',
'0366',
'0171',
'0132',
'0128',
'0311',
'0011',
'0001',
'0033',
'0073',
'0074',
'0382',
'0080',
'0172',
'0193',
'0196',
'0225',
'0156',
'0303',
'0294',
'0027',
'0048',
'0293',
'0345',
'0066',
'0076',
'0152',
'0199',
'0201',
'0203',
'0204',
'0137',
'0015',
'0065',
'0005',
'0016',
'0143',
'0211',
'0158',
'0155',
'0288',
'0308',
'0019',
'0081',
'0209',
'0314',
'0098',
'0026',
'0116',
'0141',
'0208',
'0178',
'0166',
'0290',
'0192',
'0207',
'0136',
'0082',
'0078',
'0052',
'0037',
'0067',
'0068',
'0058',
'0079',
'0077',
'0045',
'0046',
'0053',
'0170',
'0282',
'0190',
'0133',
'0138',
'0267',
'0268',
'0349',
'0226',
'0114',
'0029',
'0051',
'0071',
'0030',
'0064',
'0135',
'0205',
'0018',
'0020',
'0186',
'0187',
'0130',
'0215',
'0206',
'0142',
'0100',
'0307',
'0350',
'0024',
'0062',
'0063',
'0032',
'0007',
'1760',
'0236',
'0234',
'0347',
'0280',
'0357',
'0200',
'0084',
'0387',
'0292',
'0026',
'0028',
'0388',
'0044',
'0103',
'0222',
'0169',
'0381',
'0009',
'0163',
'0224',
'0264',
'0034',
'0055',
'0021',
'0281',
'0202',
'0060',
'0117', '0176', '0367');
