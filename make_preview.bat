@echo off

REM Creates build preview to ease editing in Windows
REM
REM Linux user should say 'make preview'

IF EXIST preview GOTO DIR_EXISTS
ECHO "Creating preview/"
MKDIR preview
:DIR_EXISTS
ECHO Copying common/*
ROBOCOPY common\ preview\common\ /E /PURGE /NFL /NDL /NJH /NJS /nc /ns /np
ECHO Copying fi/*
ROBOCOPY fi\ preview\fi\ /E /PURGE /NFL /NDL /NJH /NJS /nc /ns /np
ECHO Copying sv/*
ROBOCOPY sv\ preview\sv\ /E /PURGE /NFL /NDL /NJH /NJS /nc /ns /np
ECHO Copying content/*
ROBOCOPY content\ preview\fi\ /E /NFL /NDL /NJH /NJS /nc /ns /np
ROBOCOPY content\ preview\sv\ /E /NFL /NDL /NJH /NJS /nc /ns /np

