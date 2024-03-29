USE [QLCuaHang]
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDDH]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDDH]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MaDH) FROM DONHANG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MaDH) FROM DONHANG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'DH0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'DH000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'DH00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'DH0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'DH000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'DH00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'DH0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'DH'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDH]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDH]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MaH) FROM HANG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MaH) FROM HANG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'HH0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'HH000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'HH00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'HH0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'HH000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'HH00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'HH0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'HH'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDND]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDND]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MAND) FROM NGUOIDUNG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MAND) FROM NGUOIDUNG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'ND0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'ND000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'ND00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'ND0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'ND000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'ND00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'ND0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'ND'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  Table [dbo].[LOAIHANG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOAIHANG](
	[MaL] [char](15) NOT NULL,
	[TenL] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HANG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HANG](
	[MaH] [char](15) NOT NULL,
	[TenH] [nvarchar](100) NOT NULL,
	[Gia] [int] NOT NULL,
	[SlCon] [int] NULL,
	[HinhAnh] [char](200) NULL,
	[ChiTiet] [nvarchar](3000) NULL,
	[MaL] [char](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_HANG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_HANG]
as
select HANG.MaL, MaH, TenH, HinhAnh, SlCon, ChiTiet, Gia, TenL from HANG
inner join LOAIHANG
on LOAIHANG.MaL = HANG.MaL
GO
/****** Object:  Table [dbo].[DONHANG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DONHANG](
	[MaH] [char](15) NOT NULL,
	[MaND] [char](15) NOT NULL,
	[MADH] [char](15) NOT NULL,
	[SLMua] [int] NOT NULL,
	[TongTien] [int] NULL,
	[TrangThai] [bit] NULL,
	[NgayMua] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[MADH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_DONHANG_LOAIH]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_DONHANG_LOAIH]
as
SELECT TOP (1000) MADH
      ,SLMua
      ,TongTien
      ,TrangThai, HANG.MaL, TenL
  FROM DONHANG
  inner join HANG on HANG.MaH= DONHANG.MaH
  inner join LOAIHANG on HANG.MaL=LOAIHANG.MaL
GO
/****** Object:  Table [dbo].[NGUOIDUNG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NGUOIDUNG](
	[HoTen] [nvarchar](100) NOT NULL,
	[MatKhau] [nvarchar](100) NULL,
	[Email] [nvarchar](50) NOT NULL,
	[SDT] [varchar](11) NULL,
	[MAND] [char](15) NOT NULL,
	[VaiTro] [nvarchar](20) NULL,
	[DiaChi] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MAND] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_DONHANG_NGUOIDUNG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_DONHANG_NGUOIDUNG]
  as
  select NGUOIDUNG.MAND,HoTen, DiaChi, Email, SDT, SlMua, TongTien
  from DONHANG
  inner join NGUOIDUNG on DONHANG.MaND=NGUOIDUNG.MAND
GO
/****** Object:  UserDefinedFunction [dbo].[Tong_ND]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[Tong_ND]()
  returns table
  as
  return(
  select MAND ,sum(SlMua) as SlMua, sum(TongTien) as TongTien from DONHANG
  where TrangThai=1
  group by MAND
  )
GO
/****** Object:  View [dbo].[view_best_ND]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_best_ND]
  as
  select NGUOIDUNG.MAND, HoTen, Email, SDT, TongTien, SlMua from dbo.Tong_ND()
  inner join NGUOIDUNG on Tong_ND.MaND=NGUOIDUNG.MAND
GO
/****** Object:  UserDefinedFunction [dbo].[Tong_Hang]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[Tong_Hang]()
  returns table
  as
  return(
  select MaH ,sum(SlMua) as SlMua, sum(TongTien) as TongTien from DONHANG
  where TrangThai=1
  group by MaH
  )
GO
/****** Object:  View [dbo].[view_best_Hang]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_best_Hang]
  as
  select HANG.MaH, TenH, TenL, SlMua, TongTien from Tong_Hang()
  inner join HANG on Tong_Hang.MaH=HANG.MaH
  inner join LOAIHANG on LOAIHANG.MaL= HANG.MaL
GO
/****** Object:  View [dbo].[view_DS_DONHANG]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_DS_DONHANG]
as
SELECT DONHANG.MaH, DONHANG.MAND, MADH, SLMua, TrangThai, TongTien,TenH, Gia, LOAIHANG.MaL, LOAIHANG.TenL, SlCon, HinhAnh, ChiTiet, HoTen, Email, SDT, VaiTro, DiaChi from DONHANG 
inner join HANG on DONHANG.MaH= HANG.MaH 
inner join NGUOIDUNG on NGUOIDUNG.MaND=DONHANG.MaND
inner join LOAIHANG on LOAIHANG.MaL=HANG.MaL
GO
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000007     ', N'DH00000001     ', 5, 225000, 1, CAST(N'2019-10-15' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000001     ', N'DH00000002     ', 3, 1026000, 1, CAST(N'2019-10-14' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000002     ', N'DH00000003     ', 3, 1026000, 1, CAST(N'2019-10-13' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000003     ', N'DH00000004     ', 2, 684000, 1, CAST(N'2019-10-13' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000004     ', N'DH00000005     ', 4, 1368000, 1, CAST(N'2019-10-11' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000005     ', N'DH00000006     ', 2, 684000, 1, CAST(N'2019-10-14' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000009     ', N'DH00000007     ', 3, 135000, 1, CAST(N'2019-10-15' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000026     ', N'DH00000008     ', 1, 45000, 1, CAST(N'2019-10-16' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000003     ', N'ND00000026     ', N'DH00000009     ', 1, 342000, 1, CAST(N'2019-10-14' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000026     ', N'DH00000010     ', 1, 45000, 1, CAST(N'2019-10-13' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000026     ', N'DH00000011     ', 1, 99000, 1, CAST(N'2019-10-16' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000002     ', N'ND00000026     ', N'DH00000012     ', 1, 87000, 1, CAST(N'2019-10-16' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000031     ', N'DH00000013     ', 1, 45000, 1, CAST(N'2019-10-19' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000007     ', N'ND00000026     ', N'DH00000014     ', 1, 60000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000026     ', N'DH00000015     ', 1, 45000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000002     ', N'ND00000026     ', N'DH00000016     ', 2, 430000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000013     ', N'ND00000002     ', N'DH00000017     ', 2, 24000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000014     ', N'ND00000002     ', N'DH00000018     ', 4, 168000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000020     ', N'ND00000002     ', N'DH00000019     ', 1, 125000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000018     ', N'ND00000004     ', N'DH00000020     ', 3, 363000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000022     ', N'ND00000007     ', N'DH00000021     ', 1, 90000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000024     ', N'ND00000007     ', N'DH00000022     ', 1, 137000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000010     ', N'DH00000023     ', 2, 198000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000017     ', N'ND00000010     ', N'DH00000024     ', 1, 66000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000001     ', N'ND00000010     ', N'DH00000025     ', 1, 99000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000024     ', N'ND00000012     ', N'DH00000026     ', 1, 137000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000014     ', N'ND00000015     ', N'DH00000027     ', 1, 42000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000023     ', N'ND00000015     ', N'DH00000028     ', 1, 145000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000012     ', N'ND00000016     ', N'DH00000029     ', 5, 35000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000010     ', N'ND00000016     ', N'DH00000030     ', 1, 67000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000002     ', N'ND00000025     ', N'DH00000031     ', 1, 215000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000002     ', N'ND00000024     ', N'DH00000032     ', 1, 215000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000025     ', N'ND00000024     ', N'DH00000033     ', 1, 199000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000014     ', N'ND00000021     ', N'DH00000034     ', 1, 42000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000021     ', N'ND00000021     ', N'DH00000035     ', 4, 280000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000022     ', N'ND00000012     ', N'DH00000036     ', 7, 630000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000024     ', N'ND00000012     ', N'DH00000037     ', 1, 137000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000016     ', N'ND00000028     ', N'DH00000038     ', 10, 360000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000024     ', N'ND00000028     ', N'DH00000039     ', 1, 137000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000011     ', N'ND00000027     ', N'DH00000040     ', 1, 35000, 1, CAST(N'2019-10-20' AS Date))
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000002     ', N'ND00000023     ', N'DH00000041     ', 1, 215000, 0, NULL)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai], [NgayMua]) VALUES (N'HH00000013     ', N'ND00000023     ', N'DH00000042     ', 3, 36000, 0, NULL)
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000001     ', N'	AN TOÀN THÔNG TIN', 99000, 77, N'http://localhost/HQTCSDL/images/book6.jpg                                                                                                                                                               ', N'Cuốn sách gồm 6 chương giới thiệu tổng quan nhất về ATTT, cơ sở toán học, mã hóa thông tin, vấn đề xác nhận và chữ ký số, quản lý khóa  và ẩn-giấu tin trong An toàn thông tin.
Chương 1-Tổng quan về An toàn thông tin:
Chương 2 - Cơ sở Toán học:
Chương 3 - Hệ mật mã:
Chương 4 - Bài toán xác nhận và chữ ký số:
Chương 5 - Quản lý khóa:
Chương 6 - Ẩn_giấu tin:', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000002     ', N'Thế giới phẳng', 215000, 83, N'http://localhost/HQTCSDL/images/book10.jpg                                                                                                                                                              ', N'Thế Giới Phẳng

Trong xu thế toàn cầu hóa, việc tiếp cận và tham khảo những tri thức đương đại từ những nước đã phát triển về sự chuyển động của thế giới (đang ở bước ngoặt từ “tròn” sang “phẳng”, như cách nói của tác giả) có lẽ sẽ giúp chúng ta có thêm những thông tin bổ ích để có sự chủ động trong quá trình hội nhập. Tác phẩm được xếp vào danh mục sách bán chạy nhất ở Mỹ (kể từ lần xuất bản đầu tiên tháng 4/ 2005 cho đến nay). Đây là bản dịch từ bản sách gốc mới nhất được sửa chữa, cập nhật và bổ sung hai chương mới nhất bởi chính tác giả.

* Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, ..', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000003     ', N'Những Tấm Lòng Cao Cả', 48000, 48000, N'http://localhost/HQTCSDL/images/book1.jpg                                                                                                                                                               ', N'Những Tấm Lòng Cao Cả

Những tấm lòng cao cả (Cuore) ra đời từ những năm 80 của thế kỷ 19 đã làm cho tên tuổi nhà văn Edmondo De Amicis (1846 - 1908) trở nên nổi tiếng khắp thế giới.

Cho đến nay tác phẩm bất hủ này vẫn vang vọng và để lại dấu ấn đậm nét trong lòng người đọc đặc biệt là các em thiếu nhi ở các thời đại khác nhau.

Đó là một câu chuyện giản dị, với những con người bình thường nhất nhưng nhân cách của họ, mối quan hệ của họ, cùng những tấm lòng cao cả, thánh thiện của họ mãi là những bài học đạo đức sâu sắc và đáng quý...', N'               ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000005     ', N'101 Truyện Ngày Xưa', 98000, 53, N'http://localhost/HQTCSDL/images/book2.jpg                                                                                                                                                               ', N'101 Truyện Ngày Xưa

Truyện cổ tích không biết có từ đời nào. Tưởng đoán không ngoa là những của báu khảo cổ trên mặt đất này đã ra đời cùng lúc với tiếng nói của con người. Những câu chuyện đã nghìn đời chồng chất, biết ai đầu tiên kể, mãi mãi vẫn chắp nối, chắp nối cho đến thời có chữ ghi lại.

"Nghe cổ tích, ngẫm cổ tích, thấy được và cắt nghĩa được tất cả cơn cớ ta tồn tại, ta sinh sôi. Mỗi câu chuyện, mỗi nhân vật hoang đường đến đâu đều thấm đượm ý nghĩa đời người, con người nỗi niềm than thở hay ngàn vạn ước mong đều vẫn nảy nở từ trong tấm lòng nhân nghĩa và đức tính lam làm cùng với nụ cười thật hóm, thật duyên và phóng khoáng mọi nhẽ. Cái cười, rừng cười trong cổ tích Việt Nam sâu xa lòng tin và nghị lực"...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000006     ', N'Giáo Trình Cơ Sở Dữ Liệu Lý Thuyết Và Thực Hành', 45500, 123, N'http://localhost/HQTCSDL/images/book3.jpg                                                                                                                                                               ', N'Giáo Trình Cơ Sở Dữ Liệu Lý Thuyết Và Thực Hành được biên soạn theo một bố cục hợp lý, trình bày cô đọng, sau mỗi phần kiến thức lý thuyết đều có các ví dụ minh họa và bài tập luyện tập.

Giáo trình gồm 6 chương, cụ thể như sau:

Chương 1: Khái quát về các hệ cơ sở dữ liệu
Chương 2: Mô hình thực thể liên kết
Chương 3: Mô hình dữ liệu quan hệ và cơ sở dữ liệu quan hệ
Chương 4: Ngôn ngữ SQL
Chương 5: Hệ cơ sở dữ liệu phân tán
Chương 6: An toàn dữ liệu và tính toàn vẹn dữ lieu...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000007     ', N'Kỹ Nghệ Phần Mềm nâng cao', 60000, 59, N'http://localhost/HQTCSDL/images/book7.jpg                                                                                                                                                               ', N'Mục lục: - Chương 1: Bảo đảm chất lượng phần mềm 1.1 Khái niệm bảo đảm chất lượng 1.2 Mô hình chất lượng 1.3 Việc đo chất lượng 1.4 Một số chỉ tiêu tổng hợp đo chất lượng phần mềm - Chương 2: Các hoạt động bảo đảm chất lượng phần mềm 2.1 Thẩm định và xác minh 2.2 Kiểm thử phần mềm 2.3 Quản lý cấu hình phần mềm 2.4 Các hoạt động khác bảo đảm chất lượng phần mềm - Chương 3: Tiến trình triển khai bảo đảm chất lượng ...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000008     ', N'Tuyển Tập Dữ Liệu Lớn (Big Data)', 65000, 55, N'http://localhost/HQTCSDL/images/book4.jpg                                                                                                                                                               ', N'Tuyển Tập Dữ Liệu Lớn (Big Data)

Khi bạn sử dụng sản phẩm của một trong năm đại gia GAFAM (Google, Amazon, Facebook, Apple, Microsoft) chắc bạn không ngờ rằng mình đã góp phần tạo ra dữ liệu lớn (Big Data). Trong thế giới toàn cầu hóa ngày nay, các hoạt động hằng ngày của chúng ta (tiêu dùng, giao tiếp, di chuyển,...) tạo ra các dữ liệu, mà dấu vết là những "mảnh vụn dạng số". Từ thực tế này, khoa học dữ liệu (Data Science) ra đời để xử lí, trong thời gian kỉ lục, những dữ liệu đa dạng, thường ít được cấu trúc, ngày càng tăng, liên tục thay đổi, với những ứng dụng trong hầu hết mọi lĩnh vực và tác động đến mọi mặt của cuộc sống...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000009     ', N'Khoa Học Khám Phá - Dữ Liệu Lớn', 120000, 80, N'http://localhost/HQTCSDL/images/book5.jpg                                                                                                                                                               ', N'Màu sơn nào có thể cho bạn biết một chiếc xe đã qua sử dụng vẫn còn trong tình trạng tốt? Làm thế nào các công chức ở thành phố New York có thể xác định các hố ga nguy hiểm nhất trước khi chúng phát nổ? Và làm thế nào những cuộc tìm kiếm của Google dự đoán được sự lây lan của dịch cúm H1N1? Chìa khóa để trả lời những câu hỏi này, và nhiều câu hỏi khác, là dữ liệu lớn. "Dữ liệu lớn" đề cập đến khả năng đang phát triển của chúng ta để nắm giữ các bộ sưu tập lớn thông tin, phân tích, và rút ra những kết luận đôi khi sâu sắc đáng ngạc nhiên. Lĩnh vực khoa học đang nổi lên này có thể chuyển vô số hiện tượng – từ giá vé máy bay đến các văn bản của hàng triệu cuốn sách – thành dạng có thể tìm kiếm được, và sử dụng sức mạnh tính toán ngày càng tăng của chúng ta để khám phá những điều chúng ta chưa bao giờ có thể nhìn thấy trước. Trong một cuộc cách mạng ngang tầm với Internet hoặc thậm chí in ấn, dữ liệu lớn sẽ thay đổi cách chúng ta nghĩ về kinh doanh, y tế, chính trị, giáo dục, và sự đổi mới trong những năm tới. Nó cũng đặt ra những mối đe dọa mới, từ sự kết thúc không thể tránh khỏi của sự riêng tư cho đến khả năng bị trừng phạt vì những thứ chúng ta thậm chí còn chưa làm, dựa trên khả năng của dữ liệu lớn có thể dự đoán được hành vi tương lai của chúng ta. Trong tác phẩm thông tuệ tuyệt vời và gây nhiều ngạc nhiên này, hai chuyên gia hàng đầu giải thích dữ liệu lớn là những gì, nó sẽ làm thay đổi cuộc sống của chúng ta như thế nào, và những gì chúng ta có thể làm để bảo vệ chính mình khỏi các mối nguy hiểm của nó. Dữ liệu lớn là cuốn sách lớn đầu tiên về điều to lớn sắp diễn ra.” Bạn đọc có thể quét các QR Code bên trong sách và trên bìa sách để xem các đoạn phim minh họa...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000010     ', N'Liệu IT đã hết thời', 67000, 79, N'http://localhost/HQTCSDL/images/book8.jpg                                                                                                                                                               ', N'Liệu IT Đã Hết Thời

Công nghệ thông tin (IT) đã làm thay đổi cách thức các công ty thực hiện nhiều hoạt động quan trọng, nhưng nó vẫn chưa - ít ra là cho đến lúc này - dẫn đến bất kỳ sự thay đổi nào về hình thức hoặc kích thước thiết yếu của chúng.

IT đem lại nhiều lợi ích to lớn cho một số ít công ty, thậm chí đưa một số lên vị trí dẫn đầu trong các ngành công nghiệp, nhưng với phần lớn còn lại, nó vẫn chỉ là nguồn gốc của những thất bại và thất vọng hơn là vinh quang. Nó đã giúp nhiều công ty cắt giảm đáng kể chi phí nhân công và vốn lưu động, nhưng cũng khiến nhiều nhà quản lý tung tiền vào những đổi mới đầy rủi ro và sai lầm, đôi khi với những kết quả thật thảm hại. Vẫn còn rất khó, thậm chí không thể rút ra những kết luận khái quát về ảnh hưởng của IT đến năng lực cạnh tranh và lợi nhuận của các doanh nghiệp riêng lẻ.

Công nghệ thông tin đã trở thành chi phí vốn lớn nhất - và là một yếu tố nội tại của gần như mỗi quy trình kinh doanh hiện đại - nhưng các công ty vẫn tiếp tục đầu tư vào IT trong bóng tối, không có một nhận thức rõ ràng về chiến lược cơ bản hoặc tác động tài chính của nó. Mục tiêu của quyển sách này là giúp nâng cao sự hiểu biết đó, để cung cấp cho những nhà quản lý kinh doanh và công nghệ, cũng như những nhà đầu tư và hoạch định chính sách một quan điểm mới về sự giao nhau giữa công nghệ, cạnh tranh và lợi nhuận...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000011     ', N'Giáo trình Lập trình Java', 35000, 49, N'http://localhost/HQTCSDL/images/book9.jpg                                                                                                                                                               ', N'Java là một ngôn ngữ lập trình hoàn chỉnh, được thiết kế theo cách tiếp cận hướng đối tượng và thừa kế, sử dụng lại được...', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000012     ', N'Bút Chì Bấm Thiên Long Pc-023', 7000, 6995, N'http://localhost/HQTCSDL/images/pen2.jpg                                                                                                                                                                ', N'Bút Chì Bấm Thiên Long Pc-023 được làm bằng chất liệu nhựa cao cấp, bền chắc, cho thời gian sử dụng lâu dài. Bút bấm chắc, êm, cho ra lượng ngòi vừa phải, hạn chế tối đa sự gãy ngòi.
Sản phẩm sử dụng ngòi chì 2.0mm cho nét viết thanh mãnh, rõ ràng, tiện lợi khi ghi chú, phác họa nhanh, làm bài kiểm
Thân bút được làm từ nhựa chắc chắn, hình trụ tròn có độ bền cao, cho thời gian sử dụng lâu dài, vị trí tay cầm đệm cao su chống trơn trượt giúp bạn êm tay hơn khi viết, đồng thời chống lăn, giúp cây bút yên vị trên mặt bàn.
Bút chì là một trong những dụng cụ không thể thiếu với nhiều người, từ các em học sinh đến sinh viên, thợ mộc, họa sĩ...', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000013     ', N'Bút Dạ Quang Flexoffice Fo - Hl02', 12000, 196, N'http://localhost/HQTCSDL/images/pen1.jpg                                                                                                                                                                ', N'Bút Dạ Quang Flexoffice Fo - Hl02 có màu mực tươi sáng, phản quang tốt. Nét viết hoặc đánh dấu đều và liên tục. Không độc hại.
Đầu bút và ruột bút bằng polyester, dạng vát xéo . Vỏ bọc bằng nhựa PP.
Bề rộng nét viết: 4mm
Tuổi thọ trung bình của sản phẩm: 24 tháng tính từ ngày sản xuất.
Màu dạ quang mạnh, không làm lem nét chữ của mực khi viết chồng lên và không để lại vết khi qua photocopy...', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000014     ', N'Bút Chì Kim Bấm Pentel 0.5mm - A255A-10', 42000, 44, N'http://localhost/HQTCSDL/images/pen3.jpg                                                                                                                                                                ', N'Bút Chì Kim Bấm Pentel 0.5mm - A255A-10

Bút Chì Kim Bấm Pentel 0.5mm - A255A-10 - Nếu bạn đang tìm kiếm một cây bút chì bấm hoàn hảo nhằm hỗ trợ cho công việc và học tập thì sản phẩm này chính là sự lựa chọn tuyệt vời. Với thiết kế tinh tế, chất lượng vượt trội, bút chì kim bấm Pentel sẽ là người bạn đồng hành đáng tin cậy của bạn...', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000015     ', N'Bút Lông Dầu Flexoffice Fo-Pm01', 12000, 123, N'http://localhost/HQTCSDL/images/pen4.jpg                                                                                                                                                                ', N'Bút Lông Dầu Flexoffice Fo-Pm01 có kiểu dáng hiện đại gồm 2 đầu bút khác nhau: Đầu nhỏ và đầu lớn giúp đa dạng nét viết, thuận tiện khi sử dụng.
Màu mực đậm tươi, mực ra đều và liên tục.
Độ bám dính của mực tốt trên các vật liệu: Giấy, gỗ, da, nhựa, thủy tinh, kim loại, gốm, sứ, đĩa CD,...
Phù hợp cho: Nhân viên văn phòng, học sinh, sinh viên.
Kích thước 2 đầu bút: 1 mm và 0.4 mm.
Mực không độc hại.
Bảo quản nơi khô ráo, thoáng mát, đậy nắp ngay sau khi sử dụng.', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000016     ', N'Bút Chì Kim Kĩ Thuật Pentel A125T-A 0.5mm', 36000, 57, N'http://localhost/HQTCSDL/images/pen5.jpg                                                                                                                                                                ', N'Bút Chì Kim Kĩ Thuật Pentel A125T-A 0.5mm là sản phẩm chuyên dụng dành cho dân kĩ thuật. Sản phẩm mang lại những nét vẽ thanh mảnh, đậm nét và chuẩn xác cho bản vẽ kĩ thuật của bạn…', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000017     ', N'Bút Chì Bấm Artline Stix 7050', 66000, 321, N'http://localhost/HQTCSDL/images/pen6.jpg                                                                                                                                                                ', N'Bút Chì Bấm Artline Stix 7050 - Để việc học hành trở nên thú vị hơn, hãng Shachihata Japan đã cho ra đời dòng bút chì bấm lắp ráp vô cùng độc đáo. Bạn có thể ráp bút lại để tạo thành bất kỳ hình thù đặc sắc nào, đem đến niềm hứng khởi trong công việc và học tập. Với kiểu dáng cá tính, ấn tượng, sản phẩm không những là công cụ hỗ trợ tuyệt vời cho việc ghi chép mà còn thể hiện được "chất" riêng của bạn...', N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000018     ', N'Lốc 10 Cuốn Vở Kẻ Ngang B5 Có Chấm Campus Juvenile(80 Trang)', 121000, 87, N'http://localhost/HQTCSDL/images/note1.jpg                                                                                                                                                               ', N'Lốc 10 Cuốn Vở Kẻ Ngang B5 Có Chấm Campus Juvenile NB-BJVN80 - ĐL 58-65 (80 Trang) - Mẫu Ngẫu Nhiên gáy vở được đóng theo công nghệ ép keo đa lớp của Nhật Bản giúp cuốn vở luôn mở phẳng đẹp trên bàn học, dễ dàng lật và viết từ trang đầu tiên đến trang cuối cùng, gáy vở vuông đẹp không bị bong ra trong quá trình sử dụng.
Vở Campus được trang bị hệ thống đánh dấu bằng số thông minh cùng dòng kẻ in chính xác, rõ nét trên trang giấy giúp việc học tập dễ dàng và thuận tiện hơn...', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000019     ', N'Lốc 10 Cuốn Vở Campus Home Town 4 Ô Ly NB-BHTO48 (48 Trang)', 105000, 123, N'http://localhost/HQTCSDL/images/note2.jpg                                                                                                                                                               ', N'Lốc 10 Cuốn Vở Campus Home Town 4 Ô Ly NB-BHTO48 (48 Trang) được làm từ chất liệu giấy ngoại nhập chất lượng cao, bề mặt giấy trơn láng, viết đẹp, mượt mà.
Định lượng 100g/m2, đạt tiêu chuẩn giấy trắng ISO 82-84. Số trang 48, khổ 17 x 24 cm. Lốc gồm 10 quyển tập Campus.
Bìa vở trẻ trung, bắt mắt và là thiết kế độc quyền của Campus.
Gáy vở được đóng theo công nghệ ép keo đa lớp của Nhật Bản, giúp vở luôn mở phẳng đẹp trên bàn học, dễ dàng lật và viết từ trang đầu tiên đến trang cuối cùng. Gáy vở vuông đẹp, không bị bong ra trong quá trình sử dụng...', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000020     ', N' Lốc 5 Cuốn Tập Kẻ Ngang Campus B5 Landscape (200 Trang)', 125000, 220, N'http://localhost/HQTCSDL/images/note3.jpg                                                                                                                                                               ', N'Lốc 5 Cuốn Tập Kẻ Ngang Campus B5 Landscape (200 Trang) với chất liệu giấy ngoại nhập chất lượng cao, bề mặt giấy trơn láng, viết đẹp, mượt mà.
Bìa vở trẻ trung, bắt mắt và là thiết kế độc quyền của Campus.
Độ trắng của tập đạt ISO 95.
Gáy vở được đóng theo công nghệ ép keo đa lớp của Nhật Bản, giúp vở luôn mở phẳng đẹp trên bàn học, dễ dàng lật và viết từ trang đầu tiên đến trang cuối cùng. Gáy vở vuông đẹp, không bị bong ra trong quá trình sử dụng...', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000021     ', N'Lốc 10 Tập (Vở) Kẻ Ngang Winner KLONG 560H', 70000, 152, N'http://localhost/HQTCSDL/images/note4.jpg                                                                                                                                                               ', N'Lốc 10 Tập (Vở) Kẻ Ngang Lò Xo Winner KLONG 560H có mặt giấy láng mịn, viết êm tay, tạo nét chữ đẹp. Với định lượng 58 g/m2 giấy viết không bị lem, độ trắng 90% không làm hại mắt, ăn mực hầu hết các loại bút, giấy viết không nhòe, không thấm mực ra trang sau.
Quyển tập có đường kẻ ngang rõ ràng, đều đặn giúp các em học sinh viết chữ đẹp hơn, nắn nót hơn. Với 80 trang, đáp ứng nhu cầu học tập, làm việc của học sinh, sinh viên, nhân viên văn phòng...', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000022     ', N'Lốc 5 Tập (Vở) Kẻ Ngang Lò Xo Winner B5 KLONG 563', 90000, 159, N'http://localhost/HQTCSDL/images/note5.jpg                                                                                                                                                               ', N'Lốc 5 Tập (Vở) Kẻ Ngang Lò Xo Winner B5 KLONG 563 có mặt giấy láng mịn, viết êm tay, tạo nét chữ đẹp. Với định lượng 58 g/m2 giấy viết không bị lem, độ trắng 90% không làm hại mắt, ăn mực hầu hết các loại bút, giấy viết không nhòe, không thấm mực ra trang sau.
Quyển tập có đường kẻ ngang rõ ràng, đều đặn giúp các em học sinh viết chữ đẹp hơn, nắn nót hơn. Với 200 trang, dày, đáp ứng nhu cầu học tập, làm việc của học sinh, sinh viên, nhân viên văn phòng…', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000023     ', N'Lốc 5 Quyển Tập SV Khổ Lớn Hòa Bình (200 Trang)', 145000, 144, N'http://localhost/HQTCSDL/images/note6.jpg                                                                                                                                                               ', N'Lốc 5 Quyển Tập SV Khổ Lớn Hòa Bình (200 Trang) có mặt giấy láng mịn, viết êm tay, tạo nét chữ đẹp. Với định lượng 60gsm ăn mực hầu hết các loại bút, giấy viết không nhòe, không thấm mực ra trang sau. Chất liệu giấy không bụi, đảm bảo sức khỏe cho người sử dụng, đặc biệt là trẻ em.
Quyển tập có đường kẻ ngang rõ ràng, đều đặn giúp các em học sinh viết chữ đẹp hơn, nắn nót hơn. Với 200 trang, dày, đáp ứng nhu cầu học tập, làm việc của học sinh, sinh viên, nhân viên văn phòng...', N'LH00000003     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000024     ', N'Balo Nữ Sinh Đi Học Phong Cách Hàn Quốc G1260', 137000, 74, N'http://localhost/HQTCSDL/images/balo1.jpg                                                                                                                                                               ', N'Balo trẻ trung, năng động đem đến cho bạn sức sống mới trong mỗi chuyến đi. 

- Chất liệu: Vải thô cao cấp, chất dày dặn đảm bảo bạn sẽ hài lòng 

- Màu sắc: Tông màu nhẹ nhàng hồng, xanh, đen

- Kích thước: 43*30*13 cm

-Thiết kế: Dáng cặp balo vuông...', N'LH00000004     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000025     ', N'Balo Đi Học', 199000, 97, N'http://localhost/HQTCSDL/images/balo2.jpg                                                                                                                                                               ', N'Balo Phát Sáng, Balo Nam Nữ, Balo Đi Học Mới Nhất được thiết kế rất thẩm mĩ quai xách bền chắc cùng kiểu dáng mảnh mai là điểm nhấn riêng biệt tạo nên sự hài hòa, khỏe khoắn mà không hề đơn điệu làm bạn khó có thể từ chối được.
Đường may tinh tế và tỉ mỉ đảm bảo độ bền chắc trong suốt thời gian bạn sử dụng.
Quai đeo được thay thế theo từng phong cách khác nhau, Bạn có thể thay đổi style của mình từng ngày với 1 phụ kiện nhỏ nhắn như Vertical
Được thiết kế với khả năng trượt nước và chất lượng cao, sợi vải luôn mềm mại và bền chắc. Do đó, bạn sẽ dễ dàng bảo quản và vệ sinh…', N'LH00000004     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000026     ', N'Balo Nữ Thời Trang Phối Màu Botusi - KT50 (30 x 10 x 41 cm)', 100000, 65, N'http://localhost/HQTCSDL/images/balo3.jpg                                                                                                                                                               ', N'Balo Nữ Thời Trang Phối Màu Botusi - KT50 được thiết kế sành điệu, cá tính, là phụ kiện thời trang cá tính không thể thiếu của bạn gái mỗi khi xuống phố dạo chơi cùng bạn bè.
Không gian chứa vừa phải, tiện ích khi đựng được nhiều vật dụng cần thiết, mang đến vẻ ngoài sành điệu và sang trọng.
Quai đeo chắc chắn cùng đường may tinh tế giúp sản phẩm trở nên bền lâu.
Được gia công từ chất liệu vải bố, cùng đường chỉ may chắc chắn, đem lại độ bền cao cho sản phẩm.
Chất liệu bền đẹp với thời gian, cùng với khả năng chống thấm nước nhẹ, túi tiện lợi trong các hoạt động hằng ngày...', N'LH00000004     ')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000001     ', N'Sách')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000002     ', N'Bút')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000003     ', N'Vở')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000004     ', N'Balo')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Hưng', N'$2y$10$qRRcMJqwTsJY818lGw1m1O9obymJGF.P2a8plgywR/ccKz.SP2Ypy', N'hung@gmail.com', N'0929999998', N'ND00000002     ', N'kho', N'Hà Nội')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Phan Vinh', N'$2y$10$tfaTlaJABfXghP56U0tsaevi.vj/a5QCz8iFZbhQL215or.WS91q6', N'vinh123@gmail.com', N'0934576347', N'ND00000004     ', N'khachhang', N'Long An')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Tô Vũ', N'$2y$10$hx2qhGeXJCBrCTTV6ugcHeqE4v3gT74yRvIYZMke50Ng3B.5x1/C2', N'vu894567@gmail.com', N'0948657634', N'ND00000007     ', N'khachhang', N'Nam Định')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Tô Lâm', N'343                           ', N'lam1237@gmail.com', N'0947657348', N'ND00000008     ', N'khachhang', N'Bình Dương')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Đinh Long', N'$2y$10$BDbnzLbR/FqkfD7dj/eIHupN6qRv9hztkiPHFeXFsCkHNf241J48a', N'longak123@gmail.com', N'0847623423', N'ND00000009     ', N'khachhang', N'Hà Nội')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Hà Tiên', N'$2y$10$6wZ2FxTMUe1o8dSK/21pEOhT.2xkqc8O9TMHCJW5XcbSomGsiAsbG', N'tien123@gmail.com', N'08364563774', N'ND00000010     ', N'khachhang', N'Ninh Bình')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Phạm Linh', N'$2y$10$1pjQ0YN4yZ.pggx8nO7l/.hUWxDeUTN6O2yKigY/Nl1E6CasKdSXy', N'linhak@gmail.com', N'0835376734', N'ND00000012     ', N'khachhang', N'Hà Nội')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Đinh Liễn', N'$2y$10$A/ZgIu48drg0DmJhYD9L4.IhO1UVOX6bOsnndVs.WBxhuqEqExThO', N'liensi@gmail.com', N'0757423423', N'ND00000014     ', N'khachhang', N'Thái Bình')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Lan', N'$2y$10$MvS1g94fcEQTh80IXhb6ietbx5sViXpDNCa.0uV.pokUcbiRM2v6e', N'lanhg@gmail.com', N'098723423', N'ND00000015     ', N'khachhang', N'Hải Phòng')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Chu Kiên', N'$2y$10$C0xz78OzuhaJjOw5I.kzc.V5Wx263CxNNfJs0PQHPc3fQ2NlYC31u', N'kienha123@gmail.com', N'094523423', N'ND00000016     ', N'khachhang', N'Nam Định')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Chu Linh', N'$2y$10$z6y8HxXp1KaLCl/4at4k/Ox1L4ous2nEp1Vjyhdk77G77WdfURiiy', N'chulinh123@gmail.com', N'0839723423', N'ND00000017     ', N'khachhang', N'Hòa Bình')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Bùi Dung', N'$2y$10$HwIMn77E4lANtzplWbKBuevn/Xn/DlNKDNz4qHpLSvSEwBr9Nsv2O', N'dung32764@gmail.com', N'082223423', N'ND00000018     ', N'khachhang', N'Hà Giang')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Dương Tiễn', N'$2y$10$ESFRuV/wXrMdjdttOuPdOeK8FuITGyIe53MyrWnjtPFNkao61xCQq', N'tienna@gmail.com', N'082132342', N'ND00000019     ', N'khachhang', N'Hà Tĩnh')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Dung', N'$2y$10$fXjYsjYcvMj0wl2h574EmODPzXuYZ9kZYDFeT3AN48A.SnoCskNgK', N'dungnv@gmail.com', N'0932423423', N'ND00000020     ', N'khachhang', N'Nghệ An')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Hà', N'$2y$10$O3.tXE8EgszvwtplZ5ShA.n/.NP3fldKAN6OC3M1tYo85Q/4fWtXa', N'hanguyen12@gmail.com', N'093223423', N'ND00000021     ', N'khachhang', N'Đà Nẵng')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Trần Cung', N'$2y$10$hQY.H45m2DUrRwHYBble2eQEQFEwQXuQhq6GqGP9yrEtNHkvJaWOW', N'cungqw@gmail.com', N'0947567434', N'ND00000022     ', N'khachhang', N'Thanh Hóa')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Trịnh Sảng', N'$2y$10$6FTdpTQ6PFIiUsfk6pzU1OZ0v0uaYepzFw34TSEOVN4j185qn3W12', N'sangjh@gmail.com', N'093746372', N'ND00000023     ', N'khachhang', N'Huế')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Ninh Huế', N'$2y$10$bZUskH2APgceNFYIYWRTL.IrWswYtqPccmyLywP03FwtSGnjZ4Ja6', N'huen@gmail.com', N'0865463747', N'ND00000024     ', N'khachhang', N'Ninh Thuận')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Dương Việt', N'$2y$10$sfWO4BHMl9dKvXkN1gnH9uQj5A4XlrdeVSDKmAvTNvPaT1C8S8hGS', N'duongsieu@gmail.com', N'093657343', N'ND00000025     ', N'khachhang', N'Lạng Sơn')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'admin', N'$2y$10$PDo/GqsLlDiQDxFzr507MOgK7axGkAWSXRgfOq/B01lfLjADheghy', N'admin', N'08231321322', N'ND00000026     ', N'admin', N'')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Ninh Dân', N'$2y$10$3Oln4o/UQ6nBDWqzw51PS.WFlTRiFsYaoYCExECSzv1dfH40QxLD.', N'danndln@gmail.com', N'032309434', N'ND00000027     ', N'khachhang', N'Long An')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Hà Lam', N'$2y$10$bWrm/ueYaUTnD7Kgtt36Se2KNKrlpfZRWbpml8UFASc25PdwiCG.m', N'lam731637@gmail.com', N'0964543345', N'ND00000028     ', N'khachhang', N'Ninh Bình')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Vũ Đại', N'$2y$10$PpNPpolvRSdhHxdDB6H71ezYK.IUVGUhgrMT6fPSaa1ONOXYtFauu', N'duai13@gmail.com', N'0223423423', N'ND00000029     ', N'khachhang', N'Hà Tĩnh')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Hoàng Bích', N'$2y$10$VIUod1LM47N7NkpE7h9T7uvHsoXED7dgcj0ZyspLzUt7H4w2coGoe', N'bichhoang@gmail.com', N'0934312312', N'ND00000030     ', N'khachhang', N'Quảng Ninh')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Huy', N'$2y$10$chARhC49IZhr3wuKuI786OSgYLW.aw20xlMwJk2Bu9hwSMdu2IkcS', N'huy123@gmail.com', N'0934237642', N'ND00000031     ', N'khachhang', N'Hà Nội')
SET ANSI_PADDING ON
GO
/****** Object:  Index [myUniqueConstraint]    Script Date: 10/20/2019 11:50:15 AM ******/
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [myUniqueConstraint] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DONHANG] ADD  CONSTRAINT [DF_DONHANG_MADH]  DEFAULT ([dbo].[AUTO_IDDH]()) FOR [MADH]
GO
ALTER TABLE [dbo].[HANG] ADD  CONSTRAINT [DF_HANG_MaH]  DEFAULT ([dbo].[AUTO_IDH]()) FOR [MaH]
GO
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [DF_NGUOIDUNG_MAND]  DEFAULT ([dbo].[AUTO_IDND]()) FOR [MAND]
GO
/****** Object:  StoredProcedure [dbo].[sp_Tong_Tien]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_Tong_Tien]
  @tong int OUTPUT
  as
  begin
  select sum(TongTien) from DONHANG
  where TrangThai = '1'
  end
GO
/****** Object:  StoredProcedure [dbo].[sp_TongTien_DonHang]    Script Date: 10/20/2019 11:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_TongTien_DonHang]
@mand char(15),
@tongtien int OUTPUT
as
begin
select @tongtien = sum(TongTien) from DONHANG  
WHERE MaND = @mand and TrangThai != '1'
end
GO
