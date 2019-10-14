USE [QLCuaHang]
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDDH]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDH]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDND]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  Table [dbo].[LOAIHANG]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  Table [dbo].[HANG]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  View [dbo].[view_HANG]    Script Date: 10/14/2019 10:03:53 AM ******/
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
/****** Object:  Table [dbo].[NGUOIDUNG]    Script Date: 10/14/2019 10:03:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NGUOIDUNG](
	[HoTen] [nvarchar](100) NOT NULL,
	[MatKhau] [char](30) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[SDT] [int] NULL,
	[MAND] [char](15) NOT NULL,
	[VaiTro] [nvarchar](20) NULL,
	[DiaChi] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MAND] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DONHANG]    Script Date: 10/14/2019 10:03:53 AM ******/
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
PRIMARY KEY CLUSTERED 
(
	[MADH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_DS_DONHANG]    Script Date: 10/14/2019 10:03:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_DS_DONHANG]
as
SELECT DONHANG.MaH, DONHANG.MAND, MADH, SLMua, TongTien,TenH, Gia, MaL, SlCon, HinhAnh, ChiTiet, HoTen, Email, SDT, VaiTro, DiaChi from DONHANG 
left join HANG on DONHANG.MaH= HANG.MaH 
left join NGUOIDUNG on NGUOIDUNG.MaND=DONHANG.MaND 
WHERE DONHANG.TrangThai != 1
GO
ALTER TABLE [dbo].[DONHANG] ADD  CONSTRAINT [DF_DONHANG_MADH]  DEFAULT ([dbo].[AUTO_IDDH]()) FOR [MADH]
GO
ALTER TABLE [dbo].[HANG] ADD  CONSTRAINT [DF_HANG_MaH]  DEFAULT ([dbo].[AUTO_IDH]()) FOR [MaH]
GO
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [DF_NGUOIDUNG_MAND]  DEFAULT ([dbo].[AUTO_IDND]()) FOR [MAND]
GO
/****** Object:  StoredProcedure [dbo].[sp_DS_DONHANG]    Script Date: 10/14/2019 10:03:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_DS_DONHANG]
@MAND char(15)
as
begin
SELECT * from DONHANG 
inner join HANG on DONHANG.MaH= HANG.MaH 
inner join NGUOIDUNG on NGUOIDUNG.MaND=DONHANG.MaND 
WHERE NGUOIDUNG.MaND = @MAND and DONHANG.TrangThai != 1
end
GO
/****** Object:  StoredProcedure [dbo].[sp_TongTien_DonHang]    Script Date: 10/14/2019 10:03:53 AM ******/
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
